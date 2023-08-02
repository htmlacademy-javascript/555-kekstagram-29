import {showAlert} from './data-upload.js';

const getData = async () => {
  try {
    const response = await fetch('https://29.javascript.pages.academy/kekstagram/data');
    return await response.json();
  } catch(error) {
    showAlert('Не удалось получить изображения. Обновите страницу');
  }
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://29.javascript.pages.academy/kekstagra',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
