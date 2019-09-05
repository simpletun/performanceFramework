/*
Data provider for file reads.  Creates lineReader instance for file that must be defined in
config file.
*/
import { sleep } from '../utils/sleep';
import { logger } from '../utils/logger';
import { config, shutdown, onMessage } from '../worker';
import { LineReader } from '../utils/linereader';

let linereader = new LineReader({filename: config.fileName, chunkSize: config.chunkSize, recycleOnEof: config.recycleOnEof});

onMessage('start', async () => {
	shutdown(config.scenario.duration);

	while (true) {
		logger.debug('------- Getting next line from file, then sleeping 500ms ---------');

		let { nextLine, eof } = await linereader.nextLine();

		if(!nextLine && eof){
			logger.debug('At end of file, not configured to recycle');

			shutdown();
		}

		logger.debug(`My nextline is --> ${nextLine}`);
		logger.debug(`My eof is --> ${eof}`);

		await sleep(500);
	}
});
