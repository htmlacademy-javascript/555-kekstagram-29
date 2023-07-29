import {getRandomNumber, generateId, createRandomIdFromRange} from './util.js';

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


const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)]; //получение случайного элемента из массива данных для формирования заданных массивов

const generatePhotoId = createRandomIdFromRange(MIN_PHOTO_COUNT, MAX_PHOTO_COUNT); //получение id фото — число от 1 до 25. Идентификаторы не должны повторяться.

const createPhotoComments = () => ({
  id: generateId(),
  avatar: `img/avatar-${getRandomNumber(MIN_AVATAR_COUNT, MAX_AVATAR_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPhoto = () => {
  const unicPhotoId = generatePhotoId();
  return {
    id: unicPhotoId,
    url: `photos/${ unicPhotoId }.jpg`,
    description: getRandomArrayElement(DESCRIPSIONS),
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: Array.from({ length: getRandomNumber(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT) }, createPhotoComments)
  };
};

const photoDescription = () => Array.from({length: MAX_PHOTO_COUNT}, createPhoto);

export {createPhoto, photoDescription};
