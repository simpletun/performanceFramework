/*
Example worker to get file data from file-data-provider worker.
This pattern will most likely be used in performance scenarios to allow one worker (file-data-provider)
to manage the file readStream.
The FileReadMessenger class makes use of inter-process communication to send a message requesting a line from the
file-data-provider worker.
*/
import { logger } from '../utils/logger';
import { config, shutdown, onMessage } from '../worker';
import { FileReadMessenger } from '../utils/fileReadMessenger';

const fileReadMessenger = new FileReadMessenger({ workerGroup: 'fileReader' });
const otherFileReadMessenger = new FileReadMessenger({ workerGroup: 'otherFileReader' });

onMessage('start', async () => {
	shutdown(config.scenario.duration);

	while (true) {
		// const myLine = await getData();
		const myLine = await fileReadMessenger.getLine();

		logger.debug(`My results are --> ${myLine}`);

		// get Other line from other file
		const otherLine = await otherFileReadMessenger.getLine();

		logger.debug(`My other results are --> ${otherLine}`);
	}
});
