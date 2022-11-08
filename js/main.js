import {getPhotoMiniature} from './miniature.js';
//import {createPhotos} from './data.js'; удалить
import {SIMILAR_PHOTO_COUNT} from './data.js';
import './form.js';
import {getData} from './api.js';
//getPhotoMiniature(createPhotos(SIMILAR_PHOTO_COUNT)); удалить

import {setUserFormSubmit, closeUserModal} from './form.js';

getData((images)=> {
  getPhotoMiniature(images.slice(0, SIMILAR_PHOTO_COUNT));
});

setUserFormSubmit(closeUserModal);
