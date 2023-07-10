// Модуль для отображения фотографий других пользователей в полноразмерном режиме

import { isEscapeKey, isEnterKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content;
const commentsContainer = bigPicture.querySelector('.social__comments');

const bigPictureClose = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureClose();
  }
}

const createComment = ({ avatar, message, name }) => {
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const displayComments = (comments) => {
  commentsContainer.innerHTML = '';
  const picturesPreviewFragment = document.createDocumentFragment();

  comments.forEach((item) => {
    const comment = createComment(item);

    picturesPreviewFragment.append(comment);
  });

  commentsContainer.append(picturesPreviewFragment);

};

const bigPictureCreate = (url, description, likes, comments) => {
  bigPicture.querySelector('.big-picture__img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  displayComments(comments);
};

const bigPictureOpen = ({ url, description, likes, comments }) => {
  bigPictureCreate(url, description, likes, comments);
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

bigPictureCancel.addEventListener('click', () => {
  bigPictureClose();
});

bigPictureCancel.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    bigPictureClose();
  }
});

export { bigPictureOpen };
