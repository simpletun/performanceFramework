/*
Example worker to get mysql data from mysql-data-provider worker, using subthreads.
The subthread pattern will allow us to run many concurrent requests per worker, making each worker
more efficient.
The MysqlQueryMessenger class makes use of inter-process communication to send query requests to
a mysql-data-provider worker, which uses a db host configured in the scenario.
*/
import { sleep } from '../utils/sleep';
import { logger } from '../utils/logger';
import { randomItem, randomInt } from '../utils/random';
import { config, shutdown, onMessage } from '../worker';
import { MysqlQueryMessenger } from '../utils/mysqlQueryMessenger';

const seasonCodes = [ 'FA16', 'HO16', 'SP17', 'SU17' ];
const queryMessenger = new MysqlQueryMessenger({ workerGroup: 'queryProvider' });

onMessage('start', async () => {
	shutdown(config.scenario.duration);

	for(let i = 0; i < config.subThreads; i++){
		startSubThread();
	}
});

const startSubThread = async () => {
	logger.debug('---------Starting SubThread--------------');
	while(true){
		let season = randomItem(seasonCodes);
		let limit = randomInt(5, 20);
		const queryString = `SELECT av_product_id FROM global_product_data where season_code = '${season}' order by RAND() limit ${limit};`;
		const queryResultObj = await queryMessenger.doQuery(queryString);

		const productList = queryResultObj.map((productObject) => {
			return productObject.av_product_id;
		});

		logger.debug(`My product list --> ${JSON.stringify(productList)}`);

		await sleep(randomInt(500, 1500));
	}
};
