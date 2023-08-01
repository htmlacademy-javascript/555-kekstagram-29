import {imageUploadPreview} from './scale.js';
import {effectLevel} from './form.js';

const effectLevelSlider = document.querySelector('.effect-level__slider'); //слайдер
const effectLevelValue = document.querySelector('.effect-level__value'); //уровень эффекта записывается в поле .effect-level__value

//для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1; value="chrome"
//для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1; value="sepia"
//для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%; value="marvin"
//для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px; value="phobos"
//для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1; value="heat"
//для эффекта «Оригинал» CSS-стили filter удаляются
//начальное значение уровня насыщенности — 100%

//объект с эффектами (названия по разметке)
const FILTERS = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness',
};

//объект с параметрами эффектов, все по ТЗ 2.2
const SLIDER_PARAMETERS = {
  'chrome': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  'sepia': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  'marvin': {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => `${value}%`,
      from: (value) => Number(value.replace('%', '')),
    },
  },
  'phobos': {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => `${value}px`,
      from: (value) => Number(value.replace('px', '')),
    },
  },
  'heat': {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
};

//для эффекта «Оригинал» CSS-стили filter удаляются + при переключении эффектов слайдер, CSS-стиль изображения и значение поля должны обновляться
const resetFilter = () => {
  imageUploadPreview.style.filter = '';
  imageUploadPreview.className = '';
  effectLevel.classList.add('hidden');
};

const onPhotoAddEffect = (evt) => {
  const currentEffectValue = evt.target.value; //значение эффекта в зависимости от выбранного пункта
  if (evt.target.classList.contains('effects__radio')) {
    effectLevel.classList.remove('hidden'); //показывает слайдер при выборе одного из значений среди радиокнопок .effects__radio
    if (currentEffectValue === 'none') {
      resetFilter(); //если выбран «Оригинал», CSS-стили filter удаляются
    } else {
      noUiSlider.create(effectLevelSlider, SLIDER_PARAMETERS[currentEffectValue]); //создание слайдера с помощью noUiSlider и передача в него параметром объект с ключом, название которого соответствует выбранному эффекту
      imageUploadPreview.className = `effects__preview--${currentEffectValue}`; //при смене эффекта, выбором одного из значений среди радиокнопок .effects__radio, добавить картинке внутри .img-upload__preview CSS-класс, соответствующий эффекту
      effectLevelSlider.noUiSlider.on('update', (value, handle) => {
        imageUploadPreview.style.filter = `${FILTERS[currentEffectValue]}(${value})`; //при изменении уровня интенсивности эффекта CSS-стили картинки внутри .img-upload__preview обновляются
        effectLevelValue.value = handle; //Уровень эффекта записывается в поле .effect-level__value
      });
    }
  } else if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy(); //убираем слайдер, если выбрана не радиокнопка .effects__radio
  }
};

export {resetFilter, onPhotoAddEffect};
