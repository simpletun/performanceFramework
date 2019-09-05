const minute = 60000;

const scenario = {
	duration: 2 * minute
};

exports.workers = [
	/*{
		workerType: 'file-getter-example',
		threads: 1,
		scenario
	},*/
	{
		workerType: 'file-data-provider',
		workerGroup: 'fileReader',
		threads: 1,
		scenario,
		recycleOnEof: false,
		// chunkSize: 1024,
		fileName: 'testInput.csv',
		randomLine: true
	},
	{
		workerType: 'file-subthread-example',
		threads: 1,
		subThreads: 2,
		scenario
	},
	{
		workerType: 'file-data-provider',
		workerGroup: 'otherFileReader',
		threads: 1,
		scenario,
		recycleOnEof: true,
		// chunkSize: 1024,
		fileName: 'testInput2.csv',
		randomLine: true
	}
];
