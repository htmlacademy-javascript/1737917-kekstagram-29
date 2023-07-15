// Модуль для работы с формой редактирования изображения

import { isEscapeKey, isEnterKey } from './util.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorMessage = {
  INVALID_HASHTAG_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE_HASHTAG: 'Хэштеги не должны повторяться',
  INVALID_HASHTAG: 'Неправильный хэштег',
};

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadFile = imgUploadForm.querySelector('.img-upload__input');
const imgUploadEdit = imgUploadForm.querySelector('.img-upload__overlay');
const hashtagField = imgUploadForm.querySelector('.text__hashtags');
const commentField = imgUploadForm.querySelector('.text__description');
const imgUploadFormCancel = imgUploadForm.querySelector('.img-upload__cancel');
const pageBody = document.querySelector('body');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

// Функция-обработчик нажатия кнопки "Опубликовать"

const onImgUpdateFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

// Функция проверки, что поле ввода хэштега или поле комментария активны

const isTextFieldFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;

// Функция закрытия модального окна редактирования изображения

const imgUploadFormClose = () => {
  imgUploadForm.reset();
  pristine.reset();
  imgUploadEdit.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  // commentsLoaderButton.removeEventListener('click', onLoaderButtonClick);
};

// Функция-обработчик нажатия кнопки Escape

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    imgUploadFormClose();
  }
}

// Функция открытия модального окна редактирования изображения

const imgUploadFormOpen = () => {
  imgUploadEdit.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

// Функция-обработчик ввода имени файла

function onUploadFileChange(evt) {
  evt.preventDefault();
  imgUploadFormOpen();
}

// Функция-обработчик нажатия кнопки закрытия окна редактирования изображения
function onCancelButtonClick(evt) {
  evt.preventDefault();
  imgUploadFormClose();
}

// Функция получения массива хэштегов из строки, исключая пробелы

const normilizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

// Функция проверки количества введенных хэштегов

const hasValidHashtagCount = (value) => normilizeTags(value).length <= MAX_HASHTAG_COUNT;

// Функция проверки введенных хэштегов на соответствие паттернам

const hasValidHashtags = (value) => normilizeTags(value).every((tag) => VALID_HASHTAG_SYMBOLS.test(tag));

// Функция проверки введенных хэштегов на уникальность

const hasUniqueHashtags = (value) => {
  const lowerCaseTags = normilizeTags(value).map((tag) => tag.toLowerCase());
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

imgUploadForm.addEventListener('submit', onImgUpdateFormSubmit);

imgUploadFile.addEventListener('change', onUploadFileChange);

imgUploadFormCancel.addEventListener('click', onCancelButtonClick);
