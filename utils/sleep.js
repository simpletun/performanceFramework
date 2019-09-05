
import BBPromise from 'bluebird';

export const sleep = (ms) => {
	return new BBPromise((resolve) => setTimeout(resolve, ms));
};
