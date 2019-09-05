
import { randomBytes } from 'crypto';

export const randomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};

export const randomNumberFrom = (min, max) => {
	return randomInt(min, max + 1);
};

export const checkPercent = (percent) => {
	return randomInt(0, 100) < percent;
};

export const randomItem = (array) => {
	return array[randomInt(0, array.length)];
};

export const randomItems = (array, min, max) => {
	const count = randomInt(min || 0, max || array.length);

	let subArray = array.slice();

	while (subArray.length > count) {
		subArray.splice(randomInt(0, subArray.length), 1);
	}

	return subArray;
};

export const randomItemWeightedEven = (...arrays) => {
	return randomItem(arrays[randomInt(0, arrays.length)]);
};

export const randomItemWeightedArray = (...arraysWithWeight) => {
	const chosenObject = randomObjectWeighted(...arraysWithWeight);

	return randomItem(chosenObject.array);
};

export const randomIntWeightedRange = (...rangesWithWeight) => {
	const chosenObject = randomObjectWeighted(...rangesWithWeight);

	return randomInt(chosenObject.range.min, chosenObject.range.max) || 0;
};

export const randomObjectWeighted = (...objectsWithWeight) => {
	const objects = [ ];
	const weights = [ ];

	let totalWeight = 0;

	objectsWithWeight.forEach((theObject) => {
		objects.push(theObject);
		weights.push(totalWeight + theObject.weight);
		totalWeight += theObject.weight;
	});

	const chosenWeight = randomInt(0, totalWeight);

	const chosenObject = objects.find((array, index) => {
		return chosenWeight < weights[index];
	});

	return chosenObject;
};

export const randomCharacters = (count, chars = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789') => {
	const random = randomBytes(count);
	const result = new Array(count);
	const charCount = chars.length;

	for (let i = 0; i < count; i++) {
		result[i] = chars[random[i] % charCount];
	}

	return result.join('');
};
