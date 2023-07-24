// Модуль для проверки корректности введенных данных в форму

const MAX_HASHTAG_COUNT = 5;
const VALID_HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorMessage = {
  INVALID_HASHTAG_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE_HASHTAG: 'Хэштеги не должны повторяться',
  INVALID_HASHTAG: 'Неправильный хэштег',
};

const formImgUpload = document.querySelector('.img-upload__form');
const hashtagField = formImgUpload.querySelector('.text__hashtags');
const pristine = new Pristine(formImgUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});


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

export const validate = pristine.validate;
export const reset = pristine.reset;
