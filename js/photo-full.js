import { isEscapeKey } from './util.js';

//индексы для создания массива из 5 комментариев
const MIN_INDEX_OF_COMMENTS = 0;
const MAX_INDEX_OF_COMMENTS = 5;

const body = document.querySelector('body');

const fullPhoto = document.querySelector('.big-picture'); //окно полноразмерного показа изображения, которое каждый раз нужно заполнять данными о конкретной фотографии
const fullPhotoImg = document.querySelector('.big-picture__img'); //просмотр полноразмерного изображения
const img = fullPhotoImg.querySelector('img'); //адрес полноразмерного изображения
const socialCaption = document.querySelector('.social__caption'); //подпись фотографии
const likesCount = document.querySelector('.likes-count'); //количество лайков
const commentsCount = document.querySelector('.comments-count'); //количество комментариев
const socialComments = document.querySelector('.social__comments'); //список комментариев
const socialComment = document.querySelector('.social__comment'); //комментарий
const commentsLoader = document.querySelector('.comments-loader'); //кнопка загрузки комментариев
const socialCommentCount = document.querySelector('.social__comment-count'); //счетчик комментариев
const fullPhotoClose = document.querySelector('.big-picture__cancel'); //кнопка для выхода из полноэкранного просмотра изображения

//закрытие окна при нажатии клавиши esc
const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto();
  }
};

//закрытие окна при нажатии на кнопку «крестик»
fullPhotoClose.addEventListener('click', () => {
  closeFullPhoto();
});

const socialCommentFragment = document.createDocumentFragment(); //DOM-объект для вставки сгенерированных DOM-элементов с комментариями

//удаление комментариев из массива при закрытии окна
const removeComments = () => {
  socialComments.innerHTML = '';
};

//заполнение разметки комментария
const fillComments = (items) => {
  items.forEach(({avatar, name, message}) => { //превращение параметров объектов комментариев в переменные
    const commentElement = socialComment.cloneNode(true); //поиск нужного блока отдельного комментария для заполнения
    commentElement.querySelector('.social__picture').src = avatar; //адрес аватарки комментатора
    commentElement.querySelector('.social__picture').alt = name; //имя комментатора в качестве альта для аватарки
    commentElement.querySelector('.social__text').textContent = message; //текст комментария
    socialCommentFragment.appendChild(commentElement); //создание комментария с данными
  });

  socialComments.appendChild(socialCommentFragment); //вставка готовых комментариев в список комментариев
};

let totalCommentsArray = []; //пустой массив для записи всех комментариев

//функция показа 5 комментариев по ТЗ 4.6
const displayFiveComments = () => {
  const allComments = totalCommentsArray.length; //общее количество комментариев под фото
  const commentsFive = totalCommentsArray.slice(MIN_INDEX_OF_COMMENTS, MAX_INDEX_OF_COMMENTS); //копия части исходного массива — 5 комментариев, которые будут показаны
  fillComments(commentsFive); //отрисовка 5 комментариев
  commentsLoader.classList.remove('hidden'); //показ кнопки загрузки дополнительных комментариев
  socialCommentCount.firstChild.textContent = `${MAX_INDEX_OF_COMMENTS} из `; //изменение подписи счетчика комментариев
  if (allComments <= MAX_INDEX_OF_COMMENTS) {
    commentsLoader.classList.add('hidden'); //скрытие кнопки загрузки дополнительных комментариев
    socialCommentCount.firstChild.textContent = `${allComments} из `; //изменение подписи счетчика комментариев
  }
};

//функция отображения ещё 5 комментариев ТЗ 4.7
const displayMoreComments = () => {
  let moreComments = socialComments.children.length + MAX_INDEX_OF_COMMENTS; //сколько всего нужно отобразить комментариев при очередной итерации
  const commentsPart = totalCommentsArray.slice(socialComments.children.length, moreComments); //следующие комментарии для отображения
  fillComments(commentsPart); //отрисовка следующих 5 комментариев
  if (moreComments >= totalCommentsArray.length) { //проверка, чтобы не отображалось комментариев больше, чем есть
    moreComments = totalCommentsArray.length; //максимальное количество комментариев для отображения под текущим изображением
    commentsLoader.classList.add('hidden'); //скрытие кнопки загрузки дополнительных комментариев
    socialCommentCount.firstChild.textContent = `${moreComments} из `; //изменение подписи счетчика комментариев
  }
  socialCommentCount.firstChild.textContent = `${moreComments} из `; //изменение подписи счетчика комментариев
};

//отрисовка окна просмотра полноразмерного изображения
const fillFullPhoto = (({ url, likes, comments, description }) => { //превращение параметров объектов описания фото в переменные
  removeComments();
  totalCommentsArray = comments;
  img.src = url; //адрес изображения
  likesCount.textContent = likes; //количество лайков
  commentsCount.textContent = comments.length; //количество комментариев
  socialCaption.textContent = description; //описание фото
  displayFiveComments(); //отрисовка 5 комментариев
  openFullPhoto();
});

//функция показа окна просмотра
function openFullPhoto() {
  fullPhoto.classList.remove('hidden');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.addEventListener('click', () => displayMoreComments());
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
}

//функция скрытия окна просмотра
function closeFullPhoto() {
  fullPhoto.classList.add('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.removeEventListener('click', () => displayMoreComments());
  body.classList.remove('.modal-open');

  document.removeEventListener('keydown', onEscKeydown);
}

export {fillFullPhoto, body};
