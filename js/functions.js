const getCheckStringLength = (string, lengthLimit) => string.length <= lengthLimit;

getCheckStringLength('проверяемая строка', 10);

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
