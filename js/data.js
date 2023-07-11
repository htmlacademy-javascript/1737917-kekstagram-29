import {getRandomInteger, createRandomIdFromRangeGenerator, getRandomArrayElement} from './util.js';

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

const COMMENT_TEXT_COUNT_MIN = 1;
const COMMENT_TEXT_COUNT_MAX = 2;
const ID_COMMENTS_MIN = 1;
const ID_COMMENTS_MAX = 10000;
const AVATAR_INDEX_MIN = 1;
const AVATAR_INDEX_MAX = 6;
const URL_INDEX_MIN = 1;
const URL_INDEX_MAX = 25;
const ID_DESCRIPTION_PHOTO_MIN = 1;
const ID_DESCRIPTION_PHOTO_MAX = 25;
const COMMENTS_COUNT_MIN = 0;
const COMMENTS_COUNT_MAX = 30;
const LIKES_COUNT_MIN = 15;
const LIKES_COUNT_MAX = 200;
const DESCRIPTION_PHOTO_COUNT = 25;

// Функция создания текста комментария, сгенерированного случайным образом из массива COMMENTS

const createCommentMessage = () => {
  const randomCommentTextsCount = getRandomInteger(COMMENT_TEXT_COUNT_MIN, COMMENT_TEXT_COUNT_MAX);
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
  const randomIdComments = createRandomIdFromRangeGenerator(ID_COMMENTS_MIN, ID_COMMENTS_MAX);
  const randomAvatarIndex = getRandomInteger(AVATAR_INDEX_MIN, AVATAR_INDEX_MAX);

  return {
    id: randomIdComments(),
    avatar: `img/avatar-${randomAvatarIndex}.svg`,
    message: createCommentMessage(),
    name: getRandomArrayElement(NAMES),
  };
};

// Функция создания описания фотографии, опубликованной пользователем

const createDescriptionPhoto = () => {
  const randomIdDescriptionPhoto = createRandomIdFromRangeGenerator(ID_DESCRIPTION_PHOTO_MIN, ID_DESCRIPTION_PHOTO_MAX);
  const randomUrlIndex = createRandomIdFromRangeGenerator(URL_INDEX_MIN, URL_INDEX_MAX);

  return {
    id: randomIdDescriptionPhoto(),
    url: `photos/${randomUrlIndex()}.jpg`,
    description: 'Это описание сгенерировано случайным образом',
    likes: getRandomInteger(LIKES_COUNT_MIN, LIKES_COUNT_MAX),
    comments: Array.from({length: getRandomInteger(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX)}, createComment),
  };
};

// Функция создания массива нужного количества описаний фотографий, опубликованной пользователем

const createArrayDescriptionsPhoto = () => Array.from({length: DESCRIPTION_PHOTO_COUNT}, createDescriptionPhoto);

export {createArrayDescriptionsPhoto};
