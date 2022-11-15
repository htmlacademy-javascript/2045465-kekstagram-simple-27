import {renderPhotoMiniature} from './miniature.js';
import {getData} from './api.js';
import {setUserFormSubmit} from './form.js';
import './upload-preview.js';

getData((images)=> {
  renderPhotoMiniature(images);
});

setUserFormSubmit();
