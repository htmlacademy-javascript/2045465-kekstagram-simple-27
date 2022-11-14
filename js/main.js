import {renderPhotoMiniature} from './miniature.js';
import {getData} from './api.js';
import {setUserFormSubmit} from './form.js';

getData((images)=> {
  renderPhotoMiniature(images);
});

setUserFormSubmit();
