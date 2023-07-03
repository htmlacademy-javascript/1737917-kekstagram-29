import {createArrayDescriptionsPhoto} from './data.js';

const picturesPreviewBlock = document.querySelector('.pictures');
const picturePreviewTemplate = document.querySelector('#picture').content;

const descriptionsPhoto = createArrayDescriptionsPhoto();

const picturesPreviewFragment = document.createDocumentFragment();

descriptionsPhoto.forEach((descriptionPhoto) => {
  const picturePreviewElement = picturePreviewTemplate.cloneNode(true);
  picturePreviewElement.querySelector('.picture__img').src = descriptionPhoto.url;
  picturePreviewElement.querySelector('.picture__img').alt = descriptionPhoto.description;
  picturePreviewElement.querySelector('.picture__likes').textContent = descriptionPhoto.likes;
  picturePreviewElement.querySelector('.picture__comments').textContent = descriptionPhoto.comments.length;
  picturesPreviewFragment.append(picturePreviewElement);
});

picturesPreviewBlock.append(picturesPreviewFragment);
