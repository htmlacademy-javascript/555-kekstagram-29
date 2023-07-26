import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file'); //изначальное поле для загрузки изображения
const imgUploadOverlay = document.querySelector('.img-upload__overlay'); //форма редактирования изображения
const uploadCancel = document.querySelector('#upload-cancel'); //кнопка для закрытия формы редактирования изображения
const textHashtags = document.querySelector('.text__hashtags'); //поле для добавления хэш-тегов
const textDescription = document.querySelector('.text__description'); //поле для добавления комментария к изображению
//const imgUploadSubmit = document.querySelector('.img-upload__submit'); //кнопка для отправки данных на сервер
//

//закрытие окна загрузки при нажатии клавиши esc
const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

//запрет на закрытие окна при фокусе, если нажать клавишу esc
const stopEvent = (evt) => {
  evt.stopPropagation();
};

//сбрасывание значения поля выбора файла
const resetForm = () => {
  uploadFile.value = '';
  document.querySelector('.img-upload__form').reset();
};

//функция открытия окна добавления изображения
function openUserModal() {
  uploadFile.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden'); //показывается форма редактирования изображения ТЗ 1.2
    body.classList.add('modal-open'); //показывается форма редактирования изображения ТЗ 1.2
    document.addEventListener('keydown', onEscKeydown); //добавление обработчика для закрытия окна клавишей esc
    textHashtags.addEventListener('keydown', stopEvent); //если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения
    textDescription.addEventListener('keydown', stopEvent); //если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения
  });
}

//функция закрытия окна добавления изображения
function closeUserModal() {
  imgUploadOverlay.classList.add('hidden'); //закрытие формы редактирования изображения ТЗ 1.3
  body.classList.remove('modal-open'); //закрытие формы редактирования изображения ТЗ 1.3
  resetForm(); //сбрасывание значения поля выбора файла

  document.removeEventListener('keydown', onEscKeydown); //удаление обработчика для закрытия окна клавишей esc
  textHashtags.removeEventListener('keydown', stopEvent); // удаление обработчика на запрет закрытия окна при фокусе
  textDescription.removeEventListener('keydown', stopEvent); // удаление обработчика на запрет закрытия окна при фокусе
}

uploadFile.addEventListener('click', openUserModal);//открытие окна при клике кнопки 'загрузить'

uploadCancel.addEventListener('click', closeUserModal); //закрытие окна при клике на кнопку для закрытия формы редактирования изображения
