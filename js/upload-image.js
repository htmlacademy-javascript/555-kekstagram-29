import {imageUploadPreview} from './scale.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const effectsPreview = document.querySelectorAll('.effects__preview');
const effectsPreviewArray = [...effectsPreview];

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imageUploadPreview.src = URL.createObjectURL(file);
    effectsPreviewArray.forEach((element) => {
      element.style.backgroundImage = `url("${imageUploadPreview.src}")`;
    });
  }
});
