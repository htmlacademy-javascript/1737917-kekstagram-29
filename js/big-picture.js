// Модуль для отображения фотографий других пользователей в полноразмерном режиме

import { isEscapeKey, isEnterKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content;
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');
const pageBody = document.querySelector('body');

const bigPictureClose = () => {
  bigPicture.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
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

const displayComments = (comments) => {
  commentsContainer.innerHTML = '';
  const picturesPreviewFragment = document.createDocumentFragment();

  comments.forEach((item) => {
    const comment = createComment(item);

    picturesPreviewFragment.append(comment);
  });

  commentsContainer.append(picturesPreviewFragment);
};

// Функция заполнения данными из большой фотографии

const bigPictureCreate = (url, likes, comments) => {
  const image = bigPicture.querySelector('.big-picture__img img');
  image.src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  displayComments(comments);
};

const bigPictureOpen = ({ url, description, likes, comments }) => {
  bigPictureCreate(url, description, likes, comments);
  commentsCount.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');
  pageBody.classList.add('modal-open');
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
