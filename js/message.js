// Модуль сообщения о результатах отправки формы на сервер

import { isEscapeKey } from './util.js';

const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const pageBody = document.querySelector('body');

// Функция закрытия окна с результатом отправки формы на сервер

const hideMessage = () => {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  pageBody.removeEventListener('click', onBodyClick);
};

// Функция-обработчик нажатия кнопки Escape

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
    document.addEventListener('keydown', onDocumentKeydown);
  }
}

// Функция-обработчик клика на произвольную область экрана за пределами блока с сообщением

function onBodyClick(evt) {
  if (!(evt.target.closest('.success__inner') || evt.target.closest('.error__inner'))) {
    evt.preventDefault();
    hideMessage();
  }
}

// Функция открытия окна с результатом отправки формы на сервер

const showMessage = (messageElement, closeButtonClass) => {
  pageBody.append(messageElement);
  document.addEventListener('keydown', onDocumentKeydown);
  pageBody.addEventListener('click', onBodyClick);
  messageElement.querySelector(closeButtonClass).addEventListener('click', hideMessage);
};

// Функция открытия окна успешной отправки формы на сервер

const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};

// Функция открытия окна неуспешной отправки формы на сервер

const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
