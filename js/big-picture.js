// Модуль для отображения фотографий других пользователей в полноразмерном режиме

import { isEscapeKey } from './util.js';

const COMMENTS_PER_PORTION = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content;
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsDisplay = bigPicture.querySelector('.comments-display');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');
const pageBody = document.querySelector('body');

let commentsShown = 0;
let commentsForBigPicture = [];

// Функция закрытия большой фотографии

const bigPictureClose = () => {
  bigPicture.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderButton.removeEventListener('click', onLoaderButtonClick);
  commentsShown = 0;
  commentsForBigPicture = [];
};

// Функция-обработчик нажатия кнопки Escape

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureClose();
  }
}

// Функция создания комментария пользователя из шаблона

const createComment = ({ avatar, message, name }) => {
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

// Функция генерации и добавления в разметку комментариев пользователей из массива комментариев

const displayComments = () => {
  commentsContainer.innerHTML = '';
  const picturesPreviewFragment = document.createDocumentFragment();
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsForBigPicture.length <= commentsShown) {
    commentsDisplay.textContent = commentsForBigPicture.length;
    commentsShown = commentsForBigPicture.length;
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsDisplay.textContent = commentsShown;
    commentsLoaderButton.classList.remove('hidden');
  }

  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(commentsForBigPicture[i]);
    picturesPreviewFragment.append(comment);
  }

  commentsContainer.append(picturesPreviewFragment);
};

// Функция-обработчик нажатия кнопки загрузки дополнительных комментриев пользователей

function onLoaderButtonClick(evt) {
  evt.preventDefault();
  displayComments();
}

// Функция заполнения большой фотографии данными из маленькой картинки

const bigPictureCreate = (url, likes, comments) => {
  const image = bigPicture.querySelector('.big-picture__img img');
  image.src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  commentsCount.textContent = comments.length;
  commentsForBigPicture = comments;

  displayComments();
};

// Функция отображения большой фотографии

const bigPictureOpen = ({ url, likes, comments }) => {
  bigPictureCreate(url, likes, comments);
  pageBody.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoaderButton.addEventListener('click', onLoaderButtonClick);
  bigPictureCancel.addEventListener('click', bigPictureClose);
};

export { bigPictureOpen };
