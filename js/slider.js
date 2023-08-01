import {imageUploadPreview} from './scale.js';
import {effectLevel} from './form.js';

const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

const FILTERS = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness',
};

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

const resetFilter = () => {
  imageUploadPreview.style.filter = '';
  imageUploadPreview.className = '';
  effectLevel.classList.add('hidden');
};

const onPhotoAddEffect = (evt) => {
  const currentEffectValue = evt.target.value;
  if (evt.target.classList.contains('effects__radio')) {
    effectLevel.classList.remove('hidden');
    if (currentEffectValue === 'none') {
      resetFilter();
    } else {
      noUiSlider.create(effectLevelSlider, SLIDER_PARAMETERS[currentEffectValue]);
      imageUploadPreview.className = `effects__preview--${currentEffectValue}`;
      effectLevelSlider.noUiSlider.on('update', (value, handle) => {
        imageUploadPreview.style.filter = `${FILTERS[currentEffectValue]}(${value})`;
        effectLevelValue.value = handle;
      });
    }
  } else if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }
};

export {resetFilter, onPhotoAddEffect};
