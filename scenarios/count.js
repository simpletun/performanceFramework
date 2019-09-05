
exports.workers = [
	{
		workerType: 'count',
		threads: [
			{ startTime: 0, count: 10 },
			{ startTime: 3000, count: 10 },
			{ startTime: 6000, count: 10 }
		],
		ssl: true,
		hostname: 'av-products-qa.nikecloud.net',
		delay: 10,
		count: 10,
		method: 'get',
		headers: {
			'X-UPA_TOKEN': 'cXazgMwCcbjsJa8MFSJfv0rDfgfdlrFb'
		}
	}
];
