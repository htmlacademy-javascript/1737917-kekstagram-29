import { createArrayDescriptionsPhoto } from './data.js';
import { displayPreviewPictures } from './preview.js';
import { bigPictureOpen } from './big-picture.js';

displayPreviewPictures(createArrayDescriptionsPhoto());

// const previewPicture = document.querySelector('.picture');
// previewPicture.addEventListener('click', (evt) => {
//   evt.preventDefault();
//   bigPictureOpen(descriptionPhoto);
// });
