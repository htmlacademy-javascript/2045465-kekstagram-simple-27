//Функция для проверки максимальной длины строки
function checkString (testString, maxLength) {
  return (testString.length <= maxLength);
}

checkString ('', 2); // временно вызвала чтобы ESLint не ругался


//Функция возвращает случайное целое число из переданного диапазона включительно
function getRandomInteger (min, max) {

  if (max < min) {
    const replacement = min;
    min = max;
    max = replacement;
  }

  if ( min < 0 ) {
    return NaN;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // ссылка на источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
}


const SIMILAR_PHOTO_COUNT = 25;
const similarPhotos = [];

const DESCRIPTION = [
  'Ты, похоже, ушел в себя… и кстати, неплохо затусил.',
  'Да пребудет с тобой сила!',
  'Да, ты сегодня – милашка!',
  'Вызывай экзорциста. Уже пора!'
];

const createPhotos = (arrPhotos, countPhotos) => {
  for (let i = 1; i <= countPhotos; i++) {
    arrPhotos.push(
      {
        id: i,
        url: `photos/${i}.jpg`,
        description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
        likes: getRandomInteger(15,200),
        comments: getRandomInteger(0,200),
      });
  }
  return arrPhotos;
};

createPhotos(similarPhotos, SIMILAR_PHOTO_COUNT);

/*
const SIMILAR_PHOTO_COUNT = 25;
const similarPhotos = [];

const DESCRIPTION = [
  'Ты, похоже, ушел в себя… и кстати, неплохо затусил.',
  'Да пребудет с тобой сила!',
  'Да, ты сегодня – милашка!',
  'Вызывай экзорциста. Уже пора!'
];

  for (let i = 1; i <= SIMILAR_PHOTO_COUNT; i++) {
    similarPhotos.push(
      {
        id: i,
        url: `photos/${i}.jpg`,
        description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
        likes: getRandomInteger(15,200),
        comments: getRandomInteger(0,200),
      });
  }

*/
