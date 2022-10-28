import {getPhotoMiniature} from './miniature.js';
import {createPhotos} from './data.js';
import {SIMILAR_PHOTO_COUNT} from './data.js';
import './form.js';
//import './edit-form.js';
getPhotoMiniature(createPhotos(SIMILAR_PHOTO_COUNT));
