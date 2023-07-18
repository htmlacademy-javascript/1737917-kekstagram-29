// Модуль для работы с масштабом изображения

const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_MIN = 25;
const SCALE_DEFAULT = 100;

const imgUploadEdit = document.querySelector('.img-upload__overlay');
const scaleButtonSmaller = imgUploadEdit.querySelector('.scale__control--smaller');
const scaleButtonBigger = imgUploadEdit.querySelector('.scale__control--bigger');
const scaleInput = imgUploadEdit.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadEdit.querySelector('.img-upload__preview img');

// Функция изменения масштаба изображения

const scaleImage = (value) => {
  imgUploadPreview.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

// Функция-обработчик нажатия на кнопку уменьшения масштаба изображения

const onButtonSmallerClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  const newValue = currentValue - SCALE_STEP;
  if (newValue < SCALE_MIN) {
    scaleImage(SCALE_MIN);
  } else {
    scaleImage(newValue);
  }
};

// Функция-обработчик нажатия на кнопку увеличения масштаба изображения

const onButtonBiggerClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  const newValue = currentValue + SCALE_STEP;
  if (newValue > SCALE_MAX) {
    scaleImage(SCALE_MAX);
  } else {
    scaleImage(newValue);
  }
};

// Функция сброса масштаба изображения к значению по умолчанию

const reset = () => scaleImage(SCALE_DEFAULT);

// Функция активации управления масштабом изображения

const setScale = () => {
  scaleButtonSmaller.addEventListener('click', onButtonSmallerClick);
  scaleButtonBigger.addEventListener('click', onButtonBiggerClick);
};


export { reset, setScale };
