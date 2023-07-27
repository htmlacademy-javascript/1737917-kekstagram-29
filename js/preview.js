// Модуль для отображения фотографий других пользователей

import { bigPictureOpen } from './big-picture.js';

const picturesPreviewContainer = document.querySelector('.pictures');
const picturePreviewTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Функция создания изображения пользователя из шаблона

const createPreviewPicture = ({ url, description, likes, comments }) => {
  const picturePreviewElement = picturePreviewTemplate.cloneNode(true);

  picturePreviewElement.querySelector('.picture__img').src = url;
  picturePreviewElement.querySelector('.picture__img').alt = description;
  picturePreviewElement.querySelector('.picture__likes').textContent = likes;
  picturePreviewElement.querySelector('.picture__comments').textContent = comments.length;

  return picturePreviewElement;
};

// Функция генерации и добавления в разметку изображений пользователя из массива описаний фотографий

const displayPreviewPictures = (descriptionPhotos) => {
  picturesPreviewContainer.querySelectorAll('.picture').forEach((element) => element.remove());
  const picturesPreviewFragment = document.createDocumentFragment();
  descriptionPhotos.forEach((descriptionPhoto) => {
    const picturePreview = createPreviewPicture(descriptionPhoto);
    picturePreview.addEventListener('click', (evt) => {
      evt.preventDefault();
      bigPictureOpen(descriptionPhoto);
    });
    picturesPreviewFragment.append(picturePreview);
  });

  picturesPreviewContainer.append(picturesPreviewFragment);
};

export { displayPreviewPictures };
