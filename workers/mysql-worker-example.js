/*
Example worker to show running inline mysql query for data.  Performance workers will not usually call this directly,
but it would be useful for functional tests.
*/

import { sleep } from '../utils/sleep';
import { logger } from '../utils/logger';
import { randomItem } from '../utils/random';
import { config, shutdown, onMessage } from '../worker';
import { MysqlPool } from '../utils/mysql';

const seasonCodes = [ 'FA16', 'HO16', 'SP17', 'SU17' ];
const connectionPool = new MysqlPool({master: config.masterDb});

onMessage('start', async () => {
	while (config.count) {
		config.count--;
		await makeRequest();
		await sleep(config.delay);
	}

	shutdown();
});

const makeRequest = async () => {

	const season = randomItem(seasonCodes);
	const limit = 10;

	let { results } = await connectionPool.query(`SELECT * FROM global_product_data where season_code = '${season}' order by RAND() limit ${limit};`);

	logger.debug(`My results --> ${JSON.stringify(results)}`);
};
