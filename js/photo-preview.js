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

const filterDiscussed = (first, second) => (first.comments < second.comments) ? 1 : -1;

const filterDefault = (first, second) => (first.id > second.id) ? 1 : -1;

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

const removePhotos = () => {
  document.querySelectorAll('a.picture').forEach((el) => el.remove());
};

const makeFilters = () => {
  filterForm.addEventListener('click', debounce((evt) => {
    const makeDebounce = debounce(() => renderPhotos());
    const makeRandomDebounce = debounce(() => renderPhotos(10));
    removePhotos();
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
