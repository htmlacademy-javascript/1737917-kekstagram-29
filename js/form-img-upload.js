// Модуль для работы с формой редактирования изображения

import { sendData } from './api.js';
import { isEscapeKey } from './util.js';
import { setScale, reset as resetScale } from './scale.js';
import { setEffectSlider, reset as resetEffect } from './effects.js';
import { validate, reset as resetValidator } from './validator.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const formImgUpload = document.querySelector('.img-upload__form');
const fileImgUploadElement = formImgUpload.querySelector('.img-upload__input');
const modalImgUploadEdit = formImgUpload.querySelector('.img-upload__overlay');
const hashtagField = formImgUpload.querySelector('.text__hashtags');
const commentField = formImgUpload.querySelector('.text__description');
const buttonFormImgUploadCancel = formImgUpload.querySelector('.img-upload__cancel');
const submitButton = formImgUpload.querySelector('.img-upload__submit');
const pageBody = document.querySelector('body');

// Функция блокировки кнопки оправки формы

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

// Функция разблокировки кнопки оправки формы

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Функция установки обработчика события нажатия кнопки "Опубликовать"

const setFormImgUpdateSubmit = (onSuccess) => {
  formImgUpload.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(showSuccessMessage)
        .catch(
          () => {
            showErrorMessage();
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

// Функция проверки, что поле ввода хэштега или поле комментария активны

const isTextFieldFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;

// Функция закрытия модального окна редактирования изображения

const formImgUploadClose = () => {
  formImgUpload.reset();
  resetValidator();
  resetScale();
  resetEffect();
  modalImgUploadEdit.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Функция-обработчик нажатия кнопки Escape

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    formImgUploadClose();
  }
}

// Функция открытия модального окна редактирования изображения

const formImgUploadOpen = () => {
  modalImgUploadEdit.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  setEffectSlider();
  setScale();
  document.addEventListener('keydown', onDocumentKeydown);
};

// Функция-обработчик ввода имени файла для загрузки

function onFileImgUploadChange(evt) {
  evt.preventDefault();
  formImgUploadOpen();
}

// Функция-обработчик нажатия кнопки закрытия окна редактирования изображения

function onButtonCancelClick(evt) {
  evt.preventDefault();
  formImgUploadClose();
}

// Функция установки обработчиков событий для работы с формой редактирования изображения

const setFormImgUpdateEventListeners = () => {
  fileImgUploadElement.addEventListener('change', onFileImgUploadChange);
  buttonFormImgUploadCancel.addEventListener('click', onButtonCancelClick);
  setFormImgUpdateSubmit(formImgUploadClose);
};

export { setFormImgUpdateEventListeners };
