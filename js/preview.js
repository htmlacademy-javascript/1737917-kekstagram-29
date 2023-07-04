// Модуль для отображения фотографий других пользователей

const picturesPreviewContainer = document.querySelector('.pictures');
const picturePreviewTemplate = document.querySelector('#picture').content;

const createPreviewPicture = ({url, description, likes, comments}) => {
  const picturePreviewElement = picturePreviewTemplate.cloneNode(true);

  picturePreviewElement.querySelector('.picture__img').src = url;
  picturePreviewElement.querySelector('.picture__img').alt = description;
  picturePreviewElement.querySelector('.picture__likes').textContent = likes;
  picturePreviewElement.querySelector('.picture__comments').textContent = comments.length;

  return picturePreviewElement;
};

const displayPreviewPictures = (descriptionPhotos) => {
  const picturesPreviewFragment = document.createDocumentFragment();

  descriptionPhotos.forEach((descriptionPhoto) => {
    picturesPreviewFragment.append(createPreviewPicture(descriptionPhoto));
  });

  picturesPreviewContainer.append(picturesPreviewFragment);
};

export {displayPreviewPictures};
