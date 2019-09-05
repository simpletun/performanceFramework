
import cluster from 'cluster';
import { logger, bindWorkers as bindLogger } from './utils/logger';
import { parseRunMode, runModeFlags } from './run-mode';
import { CsvStream } from './outputs/csv';
import { JsonStream } from './outputs/json';
import { NewrelicStream } from './outputs/newrelic';

parseRunMode();

const outputType = runModeFlags.get('output') || 'csv';

const outputs = {
	csv: CsvStream,
	json: JsonStream,
	newrelic: NewrelicStream
};

const scenario = process.argv[2];
const config = global.config = require(`../scenarios/${scenario}`);
const outputStream = new outputs[outputType](`${__dirname}/../perf/results`);
const runMode = process.argv[3];

const results = [ ];
const workers = new Set();
// const lastIndex = 0;
const workersByGroup = { };
const lastIndexByGroup = { };
const workersByType = { };
const workersByPid = { };

let lastProcessedIndex = 0;

const addToWorkerGroup = (worker, workerGroup) => {
	if (! workerGroup) {
		return;
	}

	if (Array.isArray(workerGroup)) {
		return workerGroup.forEach((workerGroup) => addToWorkerGroup(worker, workerGroup));
	}

	if (! workersByGroup[workerGroup]) {
		workersByGroup[workerGroup] = [ ];
		lastIndexByGroup[workerGroup] = 0;
	}

	workersByGroup[workerGroup].push(worker);
};

const waitingThreads = [ ];

if (runModeFlags.has('heap')) {
	cluster.setupMaster({
		execArgv: process.execArgv.concat([ `--max_old_space_size=${runModeFlags.get('heap')}` ])
	});
}

logger.info('Starting up worker threads...');

let totalThreads = 0;

const createWorker = (workerConfig) => {
	const worker = cluster.fork();
	const { workerGroup, workerType } = workerConfig;

	totalThreads++;

	workers.add(worker);
	addToWorkerGroup(worker, workerGroup);

	if (! workersByType[workerType]) {
		workersByType[workerType] = new Set();
	}

	workersByType[workerType].add(worker);
	logger.debug(`Adding worker to workersByPid, pid --> ${worker.process.pid}`);
	workersByPid[worker.process.pid] = worker;

	worker.send(Object.assign({ type: 'init' }, workerConfig));

	// eslint-disable-next-line no-loop-func
	worker.on('message', (message) => {
		switch (message.type) {
			case 'response':
				logger.silly('Worker message', message);

				outputStream.write({
					pid: worker.process.pid,
					response: message,
					workerConfig: workerConfig,
					threads: {
						total: totalThreads,
						workerType: workersByType[workerType].size
					}
				});

				results.push({
					duration: message.duration,
					success: message.success
				});

				break;

			case 'done':
				totalThreads--;
				workers.delete(worker);
				workersByType[workerType].delete(worker);
				worker.kill();
				logger.verbose('Worker finished', { pid: worker.process.pid });

				if (workerGroup) {
					const groupWorkers = workersByGroup[workerGroup];
					const workerIndex = groupWorkers.indexOf(worker);

					if (workerIndex >= 0) {
						groupWorkers.splice(workerIndex, 1);

						if (lastIndexByGroup[workerGroup] >= workerIndex) {
							lastIndexByGroup[workerGroup]--;
						}
					}
				}

				if (! workers.size) {
					logger.info('Scenario complete', processResults(results));
					outputStream.on('finish', () => {
						process.exit(0);
					});
					outputStream.end();
				}

				break;

			case 'broadcast':
				const broadcastGroup = message.workerGroup ? workersByGroup[message.workerGroup] : worker;

				if (broadcastGroup) {
					broadcastGroup.forEach((worker) => {
						message.messages.forEach((subMessage) => {
							worker.send(subMessage);
						});
					});
				}

				else {
					logger.warn(`Worker group ${message.workerGroup} not found`);
				}

				break;

			case 'roundrobin':
				const roundrobinGroup = workersByGroup[message.workerGroup];

				const nextIndex = () => {
					if (lastIndexByGroup[message.workerGroup] >= roundrobinGroup.length) {
						lastIndexByGroup[message.workerGroup] = 0;
					}

					return lastIndexByGroup[message.workerGroup]++;
				};

				if (roundrobinGroup) {
					if (message.messages) {
						message.messages.forEach((subMessage) => {
							const index = nextIndex();
							const worker = roundrobinGroup[index];

							worker.send(subMessage);
						});
					}

					else {
						const index = nextIndex();
						const worker = roundrobinGroup[index];

						worker.send(message.message || message);
					}
				}

				else {
					logger.warn(`Worker group ${message.workerGroup} not found`);
				}

				break;

			case 'direct':
				if(message.message && message.to){
					const worker = workersByPid[message.to];

					if(worker){
						worker.send(message.message);
					}
				}

				break;

		}
	});

	return worker;
};

const createWorkers = (workerConfig) => {
	const { threads, workerType } = workerConfig;

	if (typeof threads === 'number') {
		for (let i = 0; i < workerConfig.threads; i++) {
			createWorker(workerConfig);
		}
	}

	else if (Array.isArray(threads)) {
		threads.forEach(({ startTime, count, config }) => {
			const threadConfig = Object.assign({ }, workerConfig, config || { });
			const startThread = () => {
				logger.debug('Starting new group of threads', { workerType, count, config });

				const newWorkers = [ ];

				for (let i = 0; i < count; i++) {
					newWorkers.push(createWorker(threadConfig));
				}

				bindLogger();

				newWorkers.forEach((worker) => {
					worker.send({ type: 'start' });
				});
			};

			waitingThreads.push(() => {
				logger.debug('Setting timer to start new threads', { waitTime: startTime, workerType, count, config });
				setTimeout(startThread, startTime);
			});
		});
	}

	else {
		logger.error('Invalid "threads" value given for worker', workerConfig);
	}
};

config.workers.forEach((workerConfig) => {
	if (runModeFlags.has('single-thread')) {
		workerConfig.threads = 1;
	}

	workerConfig.runMode = runMode;
	createWorkers(workerConfig);

	cluster.on('exit', (worker, code, signal) => {
		if (workers.has(worker)) {
			logger.warn(`Worker ${worker.process.pid} died`, {code, signal});
			workers.delete(worker);
		}

		Object.keys(workersByGroup).forEach((workerGroup) => {
			const workers = workersByGroup[workerGroup];
			const workerIndex = workers.indexOf(worker);

			if (workerIndex >= 0) {
				workers.splice(workerIndex, 1);
			}
		});
	});
});

bindLogger();

const runScenario = () => {
	logger.info(`Starting performance scenario "${scenario}"...`);

	workers.forEach((worker) => {
		worker.send({ type: 'start' });
	});

	waitingThreads.forEach((startThreadWait) => startThreadWait());

	setTimeout(processPartialResults, 5000);
};

const processResults = (results) => {
	if (! results.length) {
		const zero = '0ms';

		return {
			average: zero,
			min: zero,
			max: zero,
			average95: zero,
			max95: zero,
			count: results.length,
			successCount: 0,
			errorCount: 0
		};
	}

	let successCount = 0;
	let errorCount = 0;

	const durations = [ ];

	results.forEach((result) => {
		durations.push(result.duration);

		if (result.success) {
			successCount++;
		}
		else {
			errorCount++;
		}
	});

	durations.sort();

	const stats = getStats(durations);
	const stats95 = getStats(durations.slice(0, Math.floor(durations.length * 0.95)));

	return {
		average: `${stats.roundedAverage}ms`,
		min: `${stats.min}ms`,
		max: `${stats.max}ms`,
		average95: `${stats95.roundedAverage}ms`,
		max95: `${stats95.max}ms`,
		count: results.length,
		successCount,
		errorCount
	};
};

const processPartialResults = () => {
	const segment = results.slice(lastProcessedIndex);

	lastProcessedIndex = results.length;

	logger.info(processResults(segment));

	setTimeout(processPartialResults, 5000);
};

const getStats = (numbers) => {
	const sum = numbers.reduce((a, b) => a + b, 0);
	const average = sum / numbers.length;
	const roundedAverage = Math.round(average * 100) / 100;
	const min = Math.min(...numbers);
	const max = Math.max(...numbers);

	return { average, roundedAverage, max, min };
};

setTimeout(runScenario, 1000);
