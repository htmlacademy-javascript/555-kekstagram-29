//import {body} from './photo-full.js';
import {isEscapeKey} from './util.js';
import {onEscKeydown} from './form.js';

const ALERT_SHOW_TIME = 4000;

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const closeMessage = () => {
  const messageBlock = document.querySelector('.success') || document.querySelector('.error');
  if (messageBlock === document.querySelector('.error')) {
    messageBlock.remove();
    document.body.removeEventListener('click', onBodyClick);
    document.removeEventListener('keydown', onMessageEscKeydown);
    document.addEventListener('keydown', onEscKeydown);
  }
  messageBlock.remove();
  document.body.removeEventListener('click', onBodyClick);
  document.removeEventListener('keydown', onMessageEscKeydown);
};

function onMessageEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

function onBodyClick(evt) {
  if (!(evt.target.closest('.success__inner')) || (evt.target.closest('.error__inner'))) {
    evt.preventDefault();
    closeMessage();
  }
}

const showMessage = (message, closeButtonClass) => {
  document.body.append(message);
  document.querySelector(closeButtonClass).addEventListener('click', closeMessage);
  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('keydown', onEscKeydown);
};

const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};


const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
};

/* const showForm = (success = true) => {
  const message = success ? successContainer.cloneNode(true) : errorContainer.cloneNode(true);
  body.appendChild(message);
  message.style.zIndex = 5;
  const button = message.querySelector('button');

  document.addEventListener('keydown', onMessageEscKeydown.bind(message));
  document.addEventListener('click', onContains.bind(message));

  button.addEventListener('click', () => {
    message.style.display = 'none';
    document.removeEventListener('keydown', onMessageEscKeydown.bind(message));
    document.removeEventListener('click', onContains.bind(message));
  });
}; */

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

export {showAlert, showSuccessMessage, showErrorMessage};
