const second = 1000;
const minute = 60 * second;

const masterDb = {
	connectionLimit: 10,
	host: 'av-aurora-master-qa.nikecloud.net',
	port: '3306',
	user: 'preprodrw',
	password: 'Ori0n1dz',
	database: 'av_testdata'
};

const scenario = {
	duration: 10 * second
};

exports.workers = [
	/*{
		workerType: 'mysql-getter-example',
		threads: 5,
		scenario
	},*/
	{
		workerType: 'mysql-subthread-example',
		threads: 1,
		subThreads: 2,
		scenario
	},
	{
		workerType: 'mysql-data-provider',
		workerGroup: 'queryProvider',
		threads: 1,
		masterDb,
		scenario
	}
];
