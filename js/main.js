// Главный модуль

import { displayPreviewPictures } from './preview.js';
import './form-img-upload.js';
import { setFormImgUpdateEventListeners } from './form-img-upload.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

getData()
  .then((data) => {
    displayPreviewPictures(data);
  })
  .catch((err) => {
    showAlert(err.message);
  }
  );

setFormImgUpdateEventListeners();
