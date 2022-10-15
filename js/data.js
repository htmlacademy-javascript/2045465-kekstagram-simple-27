import {getRandomInteger} from './util.js';
const SIMILAR_PHOTO_COUNT = 25;

const DESCRIPTION = [
  'Ты, похоже, ушел в себя… и кстати, неплохо затусил.',
  'Да пребудет с тобой сила!',
  'Да, ты сегодня – милашка!',
  'Вызывай экзорциста. Уже пора!'
];

const createPhotos = (countPhotos) => {
  const similarPhotos = [];
  for (let i = 1; i <= countPhotos; i++) {
    similarPhotos.push(
      {
        id: i,
        url: `photos/${i}.jpg`,
        description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
        likes: getRandomInteger(15,200),
        comments: getRandomInteger(0,200),
      });
  }
  return similarPhotos;
};

createPhotos(SIMILAR_PHOTO_COUNT);//(similarPhotos, SIMILAR_PHOTO_COUNT);
export {createPhotos};
export {SIMILAR_PHOTO_COUNT};
