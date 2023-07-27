// Главный модуль

import { displayPreviewPictures } from './preview.js';
import './form-img-upload.js';
import { setFormImgUpdateEventListeners } from './form-img-upload.js';
import { getData } from './api.js';
import { showAlert, debounce } from './util.js';
import {init as initFilter, getFilteredPictures } from './filters.js';

getData()
  .then((data) => {
    const debouncedDisplayPreviewPictures = debounce(displayPreviewPictures);
    initFilter(data, debouncedDisplayPreviewPictures);
    displayPreviewPictures(getFilteredPictures());
  })
  .catch((err) => {
    showAlert(err.message);
  }
  );

setFormImgUpdateEventListeners();
