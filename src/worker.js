
import { logger } from './utils/logger';
import { parseRunMode } from './run-mode';

let initialized = false;
const messageListeners = { };

export const config = { };

export const shutdown = (delay) => {
	if (delay) {
		setTimeout(() => shutdown(), delay);
	}

	else {
		process.send({ type: 'done' });
	}
};

export const onMessage = (type, callback) => {
	if (! messageListeners[type]) {
		messageListeners[type] = [ ];
	}

	messageListeners[type].push(callback);
};

export const sendMessage = (type, ...data) => {
	process.send(Object.assign({ }, ...data, { type }));
};

process.on('message', (message) => {
	if (message.type === 'init') {
		if (initialized) {
			throw new Error('Attempted to initialize worker twice');
		}

		Object.assign(config, message);
		parseRunMode(config.runMode);

		initialized = true;
		logger.verbose('New worker spawned', { type: message.workerType, pid: process.pid });
		require(`./workers/${message.workerType}`);
	}

	if (messageListeners[message.type]) {
		messageListeners[message.type].forEach((callback) => callback(message));
	}
});
