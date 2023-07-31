import { fillFullPhoto } from './photo-full.js';
import { debounce } from './debounce.js';
import { getRandomNumber } from './util.js';

const previewPhotoBlock = document.querySelector('.pictures');//блок для вставки созданных элементов
const previewPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');//поиск элемента в нужном шаблоне
const filterForm = document.querySelector('.img-filters__form'); //форма фильтрации изображений от других пользователей
const defaultFilter = document.querySelector('#filter-default'); //фильтр «По умолчанию»
const randomFilter = document.querySelector('#filter-random'); //фильтр «Случайные»
const discussedFilter = document.querySelector('#filter-discussed'); //фильтр «Обсуждаемые»

const photos = {
  data: [],

  setData(photoData) {
    this.data = photoData;
  },
};

//функция фильтрации по комментариям
const filterDiscussed = (first, second) => {
  if (first.comments < second.comments) {
    return 1;
  } else {
    return -1;
  }
};

//функция фильтрации по умолчанию
const filterDefault = (first, second) => {
  if (first.id > second.id) {
    return 1;
  } else {
    return -1;
  }
};

//запись результата функции по отрисовке фотографий пользователей в переменную
const renderPhoto = (uploadedPhotos) => {

  const previewPhotoFragment = document.createDocumentFragment(); //DOM-объект для вставки сгенерированных DOM-элементов
  const usersPhotos = photos.data.slice(0, uploadedPhotos);

  usersPhotos.forEach(({ url, likes, comments, description }) => { //превращение параметров объектов в переменные
    const previewPhotoElement = previewPhotoTemplate.cloneNode(true);//клонирование шаблона для создания элементов
    previewPhotoElement.querySelector('.picture__img').src = url; //адрес изображения url подставляется как атрибут src изображения
    previewPhotoElement.querySelector('.picture__likes').textContent = likes; //количество лайков likes выводится в блок .picture__likes
    previewPhotoElement.querySelector('.picture__comments').textContent = comments.length; //количество комментариев comments выводится в блок .picture__comments

    previewPhotoFragment.appendChild(previewPhotoElement); //создание элементов с данными

    //обработчик события — открытие окна полноразмерного изображения по клику на превью
    previewPhotoElement.addEventListener('click', () => {
      fillFullPhoto({ url, likes, comments, description });
    });
  });

  previewPhotoBlock.appendChild(previewPhotoFragment);//вставка готовых элементов с данными в нужный блок
};

const removeFilter = () => {
  discussedFilter.classList.remove('img-filters__button--active');
  randomFilter.classList.remove('img-filters__button--active');
  defaultFilter.classList.remove('img-filters__button--active');
};

const rerenderPhotos = () => {
  const pictures = document.getElementsByClassName('picture');
  let numberPicture;
  while ((numberPicture = pictures[0])) {
    numberPicture.parentNode.removeChild(numberPicture);
  }
};

const onButtonClick = () => {
  filterForm.addEventListener('click', debounce((evt) => {
    const makeDebounce = debounce(() => renderPhoto());
    const makeRandomDebounce = debounce(() => renderPhoto(10));
    rerenderPhotos();
    removeFilter();
    switch (evt.target.id) {
      case 'filter-default':
        evt.target.classList.add('img-filters__button--active');
        photos.data.sort(filterDefault);
        makeDebounce();
        break;
      case 'filter-discussed':
        evt.target.classList.add('img-filters__button--active');
        photos.data.sort(filterDiscussed);
        makeDebounce();
        break;
      case 'filter-random':
        evt.target.classList.add('img-filters__button--active');
        photos.data.sort(getRandomNumber);
        makeRandomDebounce();
    }
  }));
};

export {renderPhoto, onButtonClick, photos};
