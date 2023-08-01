const getCheckStringLength = (string, lengthLimit) => string.length <= lengthLimit;

const getArrayFromString = (str) => str.toLowerCase().split(' ');

const findDuplicates = (array) => (new Set(array)).size === array.length;

const getRandomNumber = () => Math.random() - 0.5;

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomNumber, isEscapeKey, getCheckStringLength, getArrayFromString, findDuplicates};
