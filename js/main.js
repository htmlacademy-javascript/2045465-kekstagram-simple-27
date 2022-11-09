import {getPhotoMiniature} from './miniature.js';
import './form.js';
import {getData, sendData} from './api.js';
import {openSuccessMessage, openErrorMessage} from './data-message.js';
import {setUserFormSubmit, closeUserModal} from './form.js';

const SIMILAR_PHOTO_COUNT = 25;

getData((images)=> {
  getPhotoMiniature(images.slice(0, SIMILAR_PHOTO_COUNT));
});

setUserFormSubmit(closeUserModal);

// const onSendDataSuccess = () => {
//   setDefaultForm();
//   openSuccessMessage();
// };

//???????
// setUserFormSubmit (async (data) => {
//   await sendData(onSendDataSuccess, openErrorMessage, data);
// });
