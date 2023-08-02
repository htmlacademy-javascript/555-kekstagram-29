import {isEscapeKey, getCheckStringLength, getArrayFromString, findDuplicates, onElementStopEvent} from './util.js';
import {showSuccessMessage, showErrorMessage} from './data-upload.js';
import { imageUploadPreview, onScaleClick } from './scale.js';
import {resetFilter, onPhotoAddEffect} from './slider.js';
import {sendData} from './api.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;

const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadSubmit = document.querySelector('.img-upload__submit');
const regularValue = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$|(^$)/;
const imgUploadForm = document.querySelector('.img-upload__form');
const effectLevel = document.querySelector('.effect-level');
const effectsList = document.querySelector('.effects__list');
const buttonControlSmaller = document.querySelector('.scale__control--smaller');
const buttonControlBigger = document.querySelector('.scale__control--bigger');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const validateArrayLength = (hashtags) => getArrayFromString(hashtags).length <= MAX_HASHTAG_COUNT;

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  validateArrayLength,
  'Нельзя указать больше пяти хэш-тегов.'
);

const validateRegularValue = (hashtags) => getArrayFromString(hashtags).every((hashtag) => regularValue.test(hashtag));

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  validateRegularValue,
  'Хэш-тег начинается с символа # и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д. Минимальная длина хэш-тега 1 символ, максимальная – 20 символов.'
);

const validateDuplicates = (hashtags) => findDuplicates(getArrayFromString(hashtags));

pristine.addValidator(
  imgUploadForm.querySelector('.text__hashtags'),
  validateDuplicates,
  'Один и тот же хэш-тег не может быть использован дважды.'
);

const validateTextDescription = (description) => getCheckStringLength(description, MAX_COMMENT_LENGTH);

pristine.addValidator(
  imgUploadForm.querySelector('.text__description'),
  validateTextDescription,
  'Длина комментария не может составлять больше 140 символов.'
);

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const resetForm = () => {
  uploadFile.value = '';
  document.querySelector('.img-upload__form').reset();
};

function openUserModal() {
  uploadFile.addEventListener('change', () => {
    effectLevel.classList.add('hidden');
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onEscKeydown);
    textHashtags.addEventListener('keydown', onElementStopEvent);
    textDescription.addEventListener('keydown', onElementStopEvent);
    effectsList.addEventListener('click', onPhotoAddEffect);
    buttonControlSmaller.addEventListener('click', onScaleClick);
    buttonControlBigger.addEventListener('click', onScaleClick);
  });
}

function closeUserModal() {
  imageUploadPreview.style.transform = 'scale(1)';
  resetFilter();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  resetForm();

  document.removeEventListener('keydown', onEscKeydown);
  textHashtags.removeEventListener('keydown', onElementStopEvent);
  textDescription.removeEventListener('keydown', onElementStopEvent);
  effectsList.removeEventListener('click', onPhotoAddEffect);
  buttonControlSmaller.removeEventListener('click', onScaleClick);
  buttonControlBigger.removeEventListener('click', onScaleClick);
}

uploadFile.addEventListener('click', () => openUserModal());

uploadCancel.addEventListener('click', () => closeUserModal());

const blockSubmitButton = () => {
  imgUploadSubmit.disabled = true;
  imgUploadSubmit.textContent = 'Загружаем...';
};

const unblockSubmitButton = () => {
  imgUploadSubmit.disabled = false;
  imgUploadSubmit.textContent = 'Опубликовать';
};

const reloadAfterSuccess = () => {
  resetForm();
  resetFilter();
  showSuccessMessage();
};

const reloadAfterError = () => {
  showErrorMessage();
};

const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          reloadAfterSuccess();
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          reloadAfterError();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {effectLevel, closeUserModal, setUserFormSubmit, onEscKeydown};
