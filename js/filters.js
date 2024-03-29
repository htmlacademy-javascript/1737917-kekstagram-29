// Модуль для работы с фильтрами

const RANDOM_PICTURE_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filters = document.querySelector('.img-filters');

let currentFilter = Filter.DEFAULT;
let pictures = [];

// Функция случайной сортировки

const sortRandomly = () => Math.random() - 0.5;

// Функция сортировки по количеству комментариев

const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

// Функция формирования массива данный в зависимости от выбранной сортировки

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, RANDOM_PICTURE_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

// Функция установки обработчика события нажатия кнопки выбора фильтра

const setOnFilterClick = (callback) => {
  filters.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    filters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    callback(getFilteredPictures());
  });
};

// Функция инициализации фильтра

const init = (loadedPictures, callback) => {
  filters.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setOnFilterClick(callback);
};

export { init, getFilteredPictures };
