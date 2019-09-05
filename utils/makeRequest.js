import { request } from '../utils/request';
import { config, sendMessage } from '../worker';
import { logger } from '../utils/logger';

export const makeRequest = async (transaction, requestConfig, returnBody = false, ignoreError = false, ignoredCodes = []) => {
	const requestData = Object.assign({
		method: 'get',
		hostname: config.server.hostname,
		headers: config.server.headers,
		ssl: config.server.ssl,
	}, requestConfig);

	logger.silly('-------> Making Request with requestData --> ', requestData);

	const { startTime, duration, status, success, body, error, bytes, sentBytes, connect, latency } = await request(requestData);

	let reportedSuccess = success;

	if(ignoreError || ignoredCodes.includes(status.toString())){
		reportedSuccess = true;
	}

	const send = (name) =>
		sendMessage('response', {
			name,
			startTime,
			duration,
			status,
			success: reportedSuccess,
			error,
			bytes,
			sentBytes,
			connect,
			latency,
			requestConfig
		});

	send(`REQ - ${transaction}`);

	if(returnBody && success){
		return { body, status };
	}
	else {
		return { status };
	}
};
