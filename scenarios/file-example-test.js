const minute = 60000;

const scenario = {
	duration: 2 * minute
};

exports.workers = [
	{
		workerType: 'file-worker-example',
		threads: 1,
		scenario,
		recycleOnEof: false,
		chunkSize: 60,
		fileName: 'testInput.csv'
	}
];
