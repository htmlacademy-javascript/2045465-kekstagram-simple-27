import {createPhotos} from './data.js';
import {SIMILAR_PHOTO_COUNT} from './data.js';

const picturesСontainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = createPhotos(SIMILAR_PHOTO_COUNT);
const picturesСontainerFragment = document.createDocumentFragment();

pictures.forEach(({url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments;

  picturesСontainerFragment.append(pictureElement);
});

picturesСontainer.append(picturesСontainerFragment);
