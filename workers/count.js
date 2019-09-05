
import { sleep } from '../utils/sleep';
import { request } from '../utils/request';
import { randomItem, randomItems, randomIntWeightedRange } from '../utils/random';
import { getRandomWeightedRegion } from '../utils/query';
import { config, shutdown, onMessage, sendMessage } from '../worker';
import { logger } from '../utils/logger';

const ageCodes = [ '10', '20' ];
const genderCodes = [ '01', '02' ];
const divisionCodes = [ '10', '20', '30' ];

const seasonCodes = [ 'FA16', 'HO16', 'SP17', 'SU17' ];
const sizeRanges = [
	{ weight: 40, range: {min: 100, max: 250}, description: 'small' },
	{ weight: 40, range: {min: 251, max: 500}, description: 'medium' },
	{ weight: 15, range: {min: 501, max: 5000}, description: 'large' },
	{ weight: 5, range: {min: 5001, max: 10000}, description: 'xlarge' }
];

const generateQuery = () => JSON.stringify({
	where: {
		ageCode: { in: randomItems(ageCodes, 1) },
		genderCode: { in: randomItems(genderCodes, 1) },
		divisionCode: { in: randomItems(divisionCodes, 1) }
	}
});

onMessage('start', async () => {
	while (config.count) {
		config.count--;
		await makeRequest();
		await sleep(config.delay);
	}

	shutdown();
});

const makeRequest = async () => {
	const query = generateQuery();
	const regionId = getRandomWeightedRegion();
	const seasonCode = randomItem(seasonCodes);
	const randomInt = randomIntWeightedRange(...sizeRanges);

	logger.debug(`My randomInt is --> ${randomInt}`);

	const result = await request({
		ssl: config.ssl,
		hostname: config.hostname,
		path: `/av-products-service/v2/offerings/season/${seasonCode}/region/${regionId}/count?query=${query}`,
		method: config.method,
		payload: config.payload,
		headers: config.headers,
		port: config.port
	});

	sendMessage('response', {
		name: 'count',
		startTime: result.startTime,
		duration: result.duration,
		status: result.status,
		success: result.success,
		error: result.error,
		bytes: result.bytes,
		sentBytes: result.sentBytes,
		connect: result.connect,
		latency: result.latency
	});
};
