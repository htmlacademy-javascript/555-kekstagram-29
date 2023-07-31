//Функция проверки длины строки
const getCheckStringLength = (string, lengthLimit) => string.length <= lengthLimit;

//Функция получения массива из строки: строка, полученная из инпута, переводится в нижний регистр, затем через split с помощью пробела в аргументе создается массив из слов
const getArrayFromString = (str) => str.toLowerCase().split(' ');

//Функция поиска дубликатов в массиве
const findDuplicates = (array) => (new Set(array)).size === array.length;

//Функция получения случайного числа
const getRandomNumber = () => Math.random() - 0.5;

//проверка нажатой клавиши Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomNumber, isEscapeKey, getCheckStringLength, getArrayFromString, findDuplicates};
