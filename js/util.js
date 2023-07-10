//  Функция по получению случайного числа из диапазона

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция -генератор для получения случайных неповторяющихся идентификаторов из указанного диапазона, пока не будут перебраны все числа из этого диапазона

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.log(`Перебраны все числа из диапазона от ${min} до ${max}`); // eslint-disable-line no-console
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// Функция получения случайного элемента из массива

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomInteger, createRandomIdFromRangeGenerator, getRandomArrayElement};

// Функция проверки, что нажата кнопка Escape

const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция проверки, что нажата кнопка Enter

const isEnterKey = (evt) => evt.key === 'Enter';

export {isEscapeKey, isEnterKey};
