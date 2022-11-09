import {isEscapeKey} from './form.js';
//import {closeUserModal} from './form.js';
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

const onMessageEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

const onSuccessButtonClick = () => {
  hideMessage();
};

const onErrorButtonClick = () => {
  hideMessage();
};

const openSuccessMessage = () => {
  const successElement = successMessageTemplate.cloneNode(true);
  document.addEventListener('keydown', onMessageEscKeydown);
  body.append(successElement);
  document.querySelector('.success__button').addEventListener('click', onSuccessButtonClick);
  body.style.overflow = 'hidden';
};

const openErrorMessage = () => {
  const errorElement = errorMessageTemplate.cloneNode(true);
  document.addEventListener('keydown', onMessageEscKeydown);
  // добавить клик мышкой в любом месте все поля
  body.append(errorElement);
  document.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
  body.style.overflow = 'hidden';
};

function hideMessage () {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onSuccessButtonClick);
  body.style.overflow = 'auto';
}

export {openSuccessMessage, openErrorMessage};// где использовать??? в main или в setUserFormSubmit из form.js
