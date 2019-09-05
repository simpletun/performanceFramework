const masterDb = {
	host: 'av-aurora-master-qa.nikecloud.net',
	port: '3306',
	user: 'preprodrw',
	password: 'Ori0n1dz',
	database: 'av_testdata'
};

exports.workers = [
	{
		workerType: 'mysql-worker-example',
		threads: 1,
		ssl: true,
		hostname: 'av-products-qa.nikecloud.net',
		delay: 250,
		count: 3,
		masterDb,
		method: 'get',
		headers: {
			'X-UPA_TOKEN': 'cXazgMwCcbjsJa8MFSJfv0rDfgfdlrFb'
		}
	}
];
