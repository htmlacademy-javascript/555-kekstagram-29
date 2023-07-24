import './functions.js';

const NAMES = [
  'Воланд',
  'Азазелло',
  'Бегемот',
  'Фагот',
  'Гелла',
  'Маргарита',
  'Мастер',
  'Иван Бездомный',
  'Михаил Берлиоз',
  'Афраний',
  'Понтий Пилат',
  'Иешуа Га-Ноцри',
  'Левий Матвей'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPSIONS = [
  'Семиразовое питание. Нет, не лопну.',
  'Учу йоге. Дорого.',
  'А ты — завел себе своего человека?',
  'Вон кресло свободное, там и спи!',
  'Мышка. И....кошка.',
  'Лучший в мире примус!',
  'Качественное подсолнечное масло'
];

const MIN_PHOTO_COUNT = 1;
const MAX_PHOTO_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_COUNT = 1;
const MAX_AVATAR_COUNT = 6;
const MIN_COMMENT_COUNT = 0;
const MAX_COMMENT_COUNT = 30;


//Функция-генератор для получения уникальных идентификаторов. Для id комментариев. Взято из раздела 4.12 Практическая польза замыканий

function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

//получение целого числа из переданного диапазона. Взято из раздела 4.12 Практическая польза замыканий и чуточку доработано

const getRandom = (min, max) => {
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
    let currentValue = getRandom(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandom(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandom(0, elements.length - 1)]; //получение случайного элемента из массива данных для формирования заданных массивов
const generateCommentId = createIdGenerator(); //получение id комментария — любое число, не должны повторяться
const generatePhotoId = createRandomIdFromRange(MIN_PHOTO_COUNT, MAX_PHOTO_COUNT); //получение id фото — число от 1 до 25. Идентификаторы не должны повторяться.

const createPhotoComments = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandom(MIN_AVATAR_COUNT, MAX_AVATAR_COUNT)}.png`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoId()}.jpg`,
  description: getRandomArrayElement(DESCRIPSIONS),
  likes: getRandom(MIN_LIKES, MAX_LIKES),
  comments: Array.from({length: getRandom(MIN_COMMENT_COUNT,MAX_COMMENT_COUNT)}, createPhotoComments)
});

const photoDescription = Array.from({length: MAX_PHOTO_COUNT}, createPhoto);
window.console.log(photoDescription);
