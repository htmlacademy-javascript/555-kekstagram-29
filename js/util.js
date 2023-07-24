//Функция проверки длины строки
const getCheckStringLength = (string, lengthLimit) => string.length <= lengthLimit;

getCheckStringLength('проверяемая строка', 10);

//Функция проверки строки на палиндром
const getCheckStingIsPalindrome = (rawString) => {
  const string = rawString.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < string.length / 2; i++) {
    if (string.at(i) !== string.at(-i - 1)) {
      return false;
    }
  }
  return true;
};

getCheckStingIsPalindrome('Лёша на полке клопа нашёл ');
getCheckStingIsPalindrome('Это просто строка для проверки');

//Функция-генератор для получения уникальных идентификаторов. Для id комментариев. Взято из раздела 4.12 Практическая польза замыканий

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

//получение целого числа из переданного диапазона. Взято из раздела 4.12 Практическая польза замыканий и чуточку доработано

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

export {getRandomNumber, createIdGenerator, createRandomIdFromRange};
