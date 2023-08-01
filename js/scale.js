const STEP = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;

const inputControlValue = document.querySelector('.scale__control--value'); //поле со значением масштаба
const imageUploadPreview = document.querySelector('.img-upload__preview img'); //редактируемое изображение

//уменьшение или увеличение изображения по «клику» на кнопку «-»
const onScaleClick = (evt) => {
  const target = evt.target;

  let currentValue = parseInt(inputControlValue.value.replace('%', ''), 10);

  const isSmaller = target.classList.contains('scale__control--smaller');
  const isBigger = target.classList.contains('scale__control--bigger');

  if (currentValue !== MIN_VALUE && isSmaller) {
    currentValue -= STEP;
    imageUploadPreview.style.transform = `scale(${currentValue / 100})`;
    inputControlValue.value = `${currentValue}%`;
  } else if (currentValue !== MAX_VALUE && isBigger) {
    currentValue += STEP;
    imageUploadPreview.style.transform = `scale(${currentValue / 100})`;
    inputControlValue.value = `${currentValue}%`;
  }
};

export {imageUploadPreview, onScaleClick};
