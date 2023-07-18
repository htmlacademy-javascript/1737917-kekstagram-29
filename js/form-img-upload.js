// Модуль для работы с формой редактирования изображения

import { isEscapeKey } from './util.js';
import { setScale, reset as resetScale } from './scale.js';
import { setEffectSlider, reset as resetEffect } from './effects.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorMessage = {
  INVALID_HASHTAG_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE_HASHTAG: 'Хэштеги не должны повторяться',
  INVALID_HASHTAG: 'Неправильный хэштег',
};

const formImgUpload = document.querySelector('.img-upload__form');
const fileImgUploadElement = formImgUpload.querySelector('.img-upload__input');
const modalImgUploadEdit = formImgUpload.querySelector('.img-upload__overlay');
const hashtagField = formImgUpload.querySelector('.text__hashtags');
const commentField = formImgUpload.querySelector('.text__description');
const buttonFormImgUploadCancel = formImgUpload.querySelector('.img-upload__cancel');
const pageBody = document.querySelector('body');

const pristine = new Pristine(formImgUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

// Функция-обработчик нажатия кнопки "Опубликовать"

const onFormImgUpdateSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

// Функция проверки, что поле ввода хэштега или поле комментария активны

const isTextFieldFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;

// Функция закрытия модального окна редактирования изображения

const formImgUploadClose = () => {
  formImgUpload.reset();
  pristine.reset();
  resetScale();
  resetEffect();
  modalImgUploadEdit.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  // commentsLoaderButton.removeEventListener('click', onLoaderButtonClick);
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

// Функция получения массива хэштегов из строки, исключая пробелы

const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

// Функция проверки количества введенных хэштегов

const hasValidHashtagCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

// Функция проверки введенных хэштегов на соответствие паттернам

const hasValidHashtags = (value) => normalizeTags(value).every((tag) => VALID_HASHTAG_SYMBOLS.test(tag));

// Функция проверки введенных хэштегов на уникальность

const hasUniqueHashtags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

// Валидатор на количество введенных хэштегов

pristine.addValidator(
  hashtagField,
  hasValidHashtagCount,
  ErrorMessage.INVALID_HASHTAG_COUNT,
  3,
  true
);

// Валидатор на соответствие введенных хэштегов паттерным

pristine.addValidator(
  hashtagField,
  hasValidHashtags,
  ErrorMessage.INVALID_HASHTAG,
  2,
  true
);

//Валидатор на уникальность хэштегов

pristine.addValidator(
  hashtagField,
  hasUniqueHashtags,
  ErrorMessage.NOT_UNIQUE_HASHTAG,
  1,
  true
);

formImgUpload.addEventListener('submit', onFormImgUpdateSubmit);

fileImgUploadElement.addEventListener('change', onFileImgUploadChange);

buttonFormImgUploadCancel.addEventListener('click', onButtonCancelClick);
