// Модуль наложения эффекта на изображение

const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];
const DEFAULT_EFFECT = EFFECTS[0];

const modalImgUploadEdit = document.querySelector('.img-upload__overlay');
const effects = document.querySelector('.effects');
const sliderElement = modalImgUploadEdit.querySelector('.effect-level__slider');
const sliderContainerElement = modalImgUploadEdit.querySelector('.img-upload__effect-level');
const effectLevelElement = modalImgUploadEdit.querySelector('.effect-level__value');
const imgPreview = modalImgUploadEdit.querySelector('.img-upload__preview img');

let selectedEffect = DEFAULT_EFFECT;

// Функция инициализации слайдера

const initSlider = (effectConfig) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: effectConfig.min,
      max: effectConfig.max,
    },
    start: effectConfig.max,
    step: effectConfig.step,
    connect: 'lower',
  });
  effectLevelElement.value = effectConfig.max;
};

// Функция скрытия слайдера

const hideSlider = () => sliderContainerElement.classList.add('hidden');

// Функция показа слайдера

const showSlider = () => sliderContainerElement.classList.remove('hidden');

// Функция проверки, что выбран эффект «Оригинал»

const isDefault = () => selectedEffect === DEFAULT_EFFECT;

// Функция-обработчик изменения положения слайдера

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  if (isDefault()) {
    imgPreview.style.filter = DEFAULT_EFFECT.style;
  } else {
    imgPreview.style.filter = `${selectedEffect.style}(${sliderValue}${selectedEffect.unit})`;
  }
  effectLevelElement.value = sliderValue;
};

// Функция обновления парамметров слайдера

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: selectedEffect.min,
      max: selectedEffect.max,
    },
    start: selectedEffect.max,
    step: selectedEffect.step,
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

// Функция-обработчик смены выбранного эффекта

const onEffectChange = (evt) => {
  selectedEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateSlider();
};


// Функция удаления слайдера

const destroySlider = () => {
  selectedEffect = DEFAULT_EFFECT;
  sliderElement.noUiSlider.destroy();
};

// Функция активации управления эффектами изображения

const setEffectSlider = () => {
  initSlider(DEFAULT_EFFECT);
  hideSlider();
  effects.addEventListener('change', onEffectChange);
  sliderElement.noUiSlider.on('update', onSliderUpdate);
};

export { setEffectSlider, destroySlider };
