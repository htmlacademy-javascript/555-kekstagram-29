import {body} from './photo-full.js';
import {isEscapeKey} from './util.js';

const ALERT_SHOW_TIME = 4000;

const successContainer = document.querySelector('#success').content.querySelector('.success'); //поиск разметки сообщения об успешной загрузке изображения и отправке данных в нужном шаблоне
const errorContainer = document.querySelector('#error').content.querySelector('.error'); //поиск разметки сообщения об обшибке загрузки изображения и отправки данных в нужном шаблоне

function onMessageEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    this.style.display = 'none';
  }
}

function onContains(evt) {
  if (evt.target.contains(this)) {
    this.style.display = 'none';
  }
}

//если отправка данных прошла успешно, показывается соответствующее сообщение; если при отправке данных произошла ошибка запроса, нужно показать соответствующее сообщение
const showForm = (success = true) => {
  const message = success ? successContainer.cloneNode(true) : errorContainer.cloneNode(true);
  body.appendChild(message);
  message.style.zIndex = 5;
  const button = message.querySelector('button');
  const keydownFunc = onMessageEscKeydown.bind(message);

  button.addEventListener('click', () => {
    message.style.display = 'none';
    document.removeEventListener('keydown', keydownFunc);
  });

  document.addEventListener('keydown', keydownFunc);
  document.addEventListener('click', onContains.bind(message));
};

//если при загрузке данных с сервера произошла ошибка запроса, нужно показать соответствующее сообщение; дизайн блока с сообщением нужно придумать самостоятельно
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'absolute';
  alertContainer.style.zIndex = 100;
  alertContainer.style.left = 0;
  alertContainer.style.top = '50%';
  alertContainer.style.right = 0;
  alertContainer.style.fontSize = '20px';
  alertContainer.style.lineHeight = '27px';
  alertContainer.style.fontWeight = '600';
  alertContainer.style.padding = '20px';
  alertContainer.style.borderRadius = '15px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#232321';
  alertContainer.style.color = '#ff0000';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {showForm, showAlert};
