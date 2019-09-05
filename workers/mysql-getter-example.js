/*
Example worker to get mysql data from mysql-data-provider worker.
This pattern will most likely be used in performance scenarios to allow one worker (mysql-data-provider)
to manage the connection pool and return results.
The MysqlQueryMessenger class makes use of inter-process communication to send query requests to
a mysql-data-provider worker, which uses a db host configured in the scenario.
*/
import { sleep } from '../utils/sleep';
import { logger } from '../utils/logger';
import { randomItem } from '../utils/random';
import { config, shutdown, onMessage } from '../worker';
import { MysqlQueryMessenger } from '../utils/mysqlQueryMessenger';

const seasonCodes = [ 'FA16', 'HO16', 'SP17', 'SU17' ];
const queryMessenger = new MysqlQueryMessenger({ workerGroup: 'queryProvider' });
const limit = 10;

onMessage('start', async () => {
	shutdown(config.scenario.duration);

	while (true) {
		let season = randomItem(seasonCodes);
		const queryString = `SELECT av_product_id FROM global_product_data where season_code = '${season}' order by RAND() limit ${limit};`;
		const queryResultObj = await queryMessenger.doQuery(queryString);

		logger.debug(`My result Object --> ${JSON.stringify(queryResultObj)}`);

		const productList = queryResultObj.map((productObject) => {
			return productObject.av_product_id;
		});

		logger.debug(`My product list --> ${JSON.stringify(productList)}`);

		await sleep(1000);
	}
});
