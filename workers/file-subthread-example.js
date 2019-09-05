/*
Example worker to get file data from file-data-provider worker.
This particular worker also shows a pattern for using subthreads to make more efficient use of each worker type.
The FileReadMessenger class makes use of inter-process communication to send a message requesting a line from the
file-data-provider worker.
*/
import { logger } from '../utils/logger';
import { config, shutdown, onMessage } from '../worker';
import { FileReadMessenger } from '../utils/fileReadMessenger';
import { sleep } from '../utils/sleep';

const fileReadMessenger = new FileReadMessenger({ workerGroup: 'fileReader' });
const otherFileReadMessenger = new FileReadMessenger({ workerGroup: 'otherFileReader' });

onMessage('start', async () => {
	shutdown(config.scenario.duration);

	for(let i = 0; i < config.subThreads; i++){
		startSubThread();
	}
});

const startSubThread = async () => {
	logger.debug('-----------Starting Subthread-------------');
	while (true) {
		// const myLine = await getData();
		const myLine = await fileReadMessenger.getLine(config.randomLine);

		logger.debug(`My results are --> ${myLine}`);

		// get Other line from other file
		const otherLine = await otherFileReadMessenger.getLine(config.randomLine);

		logger.debug(`My other results are --> ${otherLine}`);

		await sleep(1000);
	}
};
