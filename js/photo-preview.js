import { fillFullPhoto } from './photo-full.js';
import { debounce } from './debounce.js';
import { getRandomNumber } from './util.js';

const previewPhotoBlock = document.querySelector('.pictures');
const previewPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filterForm = document.querySelector('.img-filters__form');
const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

const photos = {
  data: [],

  setData(photoData) {
    this.data = photoData;
  },
};

const filterDiscussed = (first, second) => {
  if (first.comments < second.comments) {
    return 1;
  } else {
    return -1;
  }
};

const filterDefault = (first, second) => {
  if (first.id > second.id) {
    return 1;
  } else {
    return -1;
  }
};

const renderPhotos = (uploadedPhotos) => {

  const previewPhotoFragment = document.createDocumentFragment();
  const usersPhotos = photos.data.slice(0, uploadedPhotos);

  usersPhotos.forEach(({ url, likes, comments, description }) => {
    const previewPhotoElement = previewPhotoTemplate.cloneNode(true);
    previewPhotoElement.querySelector('.picture__img').src = url;
    previewPhotoElement.querySelector('.picture__likes').textContent = likes;
    previewPhotoElement.querySelector('.picture__comments').textContent = comments.length;

    previewPhotoFragment.appendChild(previewPhotoElement);

    previewPhotoElement.addEventListener('click', () => {
      fillFullPhoto({ url, likes, comments, description });
    });
  });

  previewPhotoBlock.appendChild(previewPhotoFragment);
};

const removeFilter = () => {
  discussedFilter.classList.remove('img-filters__button--active');
  randomFilter.classList.remove('img-filters__button--active');
  defaultFilter.classList.remove('img-filters__button--active');
};

const rerenderPhotos = () => {
  const pictures = document.getElementsByClassName('picture');
  let numberPicture;
  while ((numberPicture = pictures[0])) {
    numberPicture.parentNode.removeChild(numberPicture);
  }
};

const makeFilters = () => {
  filterForm.addEventListener('click', debounce((evt) => {
    const makeDebounce = debounce(() => renderPhotos());
    const makeRandomDebounce = debounce(() => renderPhotos(10));
    rerenderPhotos();
    removeFilter();
    switch (evt.target.id) {
      case 'filter-default':
        evt.target.classList.add('img-filters__button--active');
        photos.data.sort(filterDefault);
        makeDebounce();
        break;
      case 'filter-discussed':
        evt.target.classList.add('img-filters__button--active');
        photos.data.sort(filterDiscussed);
        makeDebounce();
        break;
      case 'filter-random':
        evt.target.classList.add('img-filters__button--active');
        photos.data.sort(getRandomNumber);
        makeRandomDebounce();
    }
  }));
};

export {renderPhotos, makeFilters, photos};
