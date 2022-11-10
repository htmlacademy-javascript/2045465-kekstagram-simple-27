import {getPhotoMiniature} from './miniature.js';
import './form.js';
import {getData} from './api.js';
import {setUserFormSubmit, closeUserModal} from './form.js';

const SIMILAR_PHOTO_COUNT = 25;

getData((images)=> {
  getPhotoMiniature(images.slice(0, SIMILAR_PHOTO_COUNT));
});

setUserFormSubmit(closeUserModal);
