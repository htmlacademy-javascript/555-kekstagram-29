import { photoDescription } from './data.js';
import { fillFullPhoto } from './photo-full.js';

const previewPhotoBlock = document.querySelector('.pictures');//блок для вставки созданных элементов
const previewPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');//поиск элемента в нужном шаблоне


const usersPhoto = photoDescription(); //созданный массив как результат работы функции

const previewPhotoFragment = document.createDocumentFragment(); //DOM-объект для вставки сгенерированных DOM-элементов

usersPhoto.forEach(({url, likes, comments, description}) => { //превращение параметров объектов в переменные
  const previewPhotoElement = previewPhotoTemplate.cloneNode(true);//клонирование шаблона для создания элементов
  previewPhotoElement.querySelector('.picture__img').src = url; //адрес изображения url подставляется как атрибут src изображения
  previewPhotoElement.querySelector('.picture__img').alt = description; //описание изображения description подставляется в атрибут alt изображения
  previewPhotoElement.querySelector('.picture__likes').textContent = likes; //количество лайков likes выводится в блок .picture__likes
  previewPhotoElement.querySelector('.picture__comments').textContent = comments.length; //количество комментариев comments выводится в блок .picture__comments

  previewPhotoFragment.appendChild(previewPhotoElement); //создание элементов с данными

  //обработчик события — открытие окна полноразмерного изображения по клику на превью]
  previewPhotoElement.addEventListener('click', () => {
    fillFullPhoto({url, likes, comments, description});
  });
});

previewPhotoBlock.appendChild(previewPhotoFragment);//вставка готовых элементов с данными в нужный блок
