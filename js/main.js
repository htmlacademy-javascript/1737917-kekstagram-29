const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

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
      console.log(`Перебраны все числа из диапазона от ${min} до ${max}`);
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

// Функция создания текста комментария, сгенерированного случайным образом из массива COMMENTS

const createCommentMessage = () => {
  const randomCommentTextsCount = getRandomInteger(1, 2);
  let CommentText = '';

  for(let i = 1; i <= randomCommentTextsCount; i++) {
    let currentCommentText = getRandomArrayElement(COMMENTS);
    while (currentCommentText === CommentText.trim()) {
      currentCommentText = getRandomArrayElement(COMMENTS);
    }
    CommentText += `${currentCommentText} `;
  }

  return CommentText.trim();
};

// Функция создания комментария от пользователя, сгенерированного случайным образом

const createComment = () => {
  const randomIdComments = createRandomIdFromRangeGenerator(1, 1000);
  const randomAvatarIndex = getRandomInteger(1, 6);

  return {
    id: randomIdComments(),
    avatar: `mg/avatar-${randomAvatarIndex}.svg`,
    message: createCommentMessage(),
    name: getRandomArrayElement(NAMES),
  };
};

// Функция создания описания фотографии, опубликованной пользователем

const createDescriptionPhoto = () => {
  const randomIdDescriptionPhoto = createRandomIdFromRangeGenerator(1, 25);
  const randomUrlIndex = createRandomIdFromRangeGenerator(1, 25);

  return {
    id: randomIdDescriptionPhoto(),
    url: `photos/${randomUrlIndex()}.jpg`,
    description: 'Это описание сгенерировано случайным образом',
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
  };
};

const DescriptionPhotos = Array.from({length: 25}, createDescriptionPhoto);

console.log(DescriptionPhotos);
