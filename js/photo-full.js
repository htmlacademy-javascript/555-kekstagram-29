import { isEscapeKey } from './util.js';

const MIN_INDEX_OF_COMMENTS = 0;
const MAX_INDEX_OF_COMMENTS = 5;

const body = document.querySelector('body');

const fullPhoto = document.querySelector('.big-picture');
const fullPhotoImg = document.querySelector('.big-picture__img');
const img = fullPhotoImg.querySelector('img');
const socialCaption = document.querySelector('.social__caption');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');
const socialCommentCount = document.querySelector('.social__comment-count');
const fullPhotoClose = document.querySelector('.big-picture__cancel');

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto();
  }
};

fullPhotoClose.addEventListener('click', () => {
  closeFullPhoto();
});

const socialCommentFragment = document.createDocumentFragment();

const removeComments = () => {
  socialComments.innerHTML = '';
};

const fillComments = (items) => {
  items.forEach(({avatar, name, message}) => {
    const commentElement = socialComment.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    socialCommentFragment.appendChild(commentElement);
  });

  socialComments.appendChild(socialCommentFragment);
};

let totalCommentsArray = [];

const displayFiveComments = () => {
  const allComments = totalCommentsArray.length;
  const commentsFive = totalCommentsArray.slice(MIN_INDEX_OF_COMMENTS, MAX_INDEX_OF_COMMENTS);
  fillComments(commentsFive);
  commentsLoader.classList.remove('hidden');
  socialCommentCount.firstChild.textContent = `${MAX_INDEX_OF_COMMENTS} из `;
  if (allComments <= MAX_INDEX_OF_COMMENTS) {
    commentsLoader.classList.add('hidden');
    socialCommentCount.firstChild.textContent = `${allComments} из `;
  }
};

const displayMoreComments = () => {
  let moreComments = socialComments.children.length + MAX_INDEX_OF_COMMENTS;
  const commentsPart = totalCommentsArray.slice(socialComments.children.length, moreComments);
  fillComments(commentsPart);
  if (moreComments >= totalCommentsArray.length) {
    moreComments = totalCommentsArray.length;
    commentsLoader.classList.add('hidden');
    socialCommentCount.firstChild.textContent = `${moreComments} из `;
  }
  socialCommentCount.firstChild.textContent = `${moreComments} из `;
};

const fillFullPhoto = (({ url, likes, comments, description }) => {
  removeComments();
  totalCommentsArray = comments;
  img.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;
  displayFiveComments();
  openFullPhoto();
});

function openFullPhoto() {
  fullPhoto.classList.remove('hidden');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.addEventListener('click', displayMoreComments);
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeydown);
}

function closeFullPhoto() {
  fullPhoto.classList.add('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.removeEventListener('click', displayMoreComments);
  body.classList.remove('.modal-open');

  document.removeEventListener('keydown', onEscKeydown);
}

export {fillFullPhoto, body};
