//Функция проверки длины строки
const getCheckStringLength = (string, lengthLimit) => string.length <= lengthLimit;

//Функция получения массива из строки: строка, полученная из инпута, переводится в нижний регистр, затем через split с помощью пробела в аргументе создается массив из слов
const getArrayFromString = (str) => str.toLowerCase().split(' ');

//Функция поиска дубликатов в массиве
const findDuplicates = (array) => (new Set(array)).size === array.length;

//Функция-генератор для получения уникальных идентификаторов. Для id комментариев. Взято из раздела 4.12 Практическая польза замыканий
function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const generateId = createIdGenerator();

//Функция получения случайного числа из переданного диапазона
const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= 0 && max > min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return 'Invalid Data Input';
  }
};

//Функция-генератор для получения случайного числа из указанного диапазона, и так, чтобы они не повторялись, пока не будут перебраны все числа из этого промежутка. Взята из раздела 4.12 Практическая польза замыканий
function createRandomIdFromRange (min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomNumber(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

//проверка нажатой клавиши Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomNumber, generateId, createRandomIdFromRange, isEscapeKey, getCheckStringLength, getArrayFromString, findDuplicates};
