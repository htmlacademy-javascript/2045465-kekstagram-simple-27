import {isEscapeKey} from './form.js';
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
  //сообщение исчезает по клику на произвольную область экрана
  successElement.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      hideMessage(evt.target.closest('.success'));
    }
  });
};

const openErrorMessage = () => {
  const errorElement = errorMessageTemplate.cloneNode(true);
  document.addEventListener('keydown', onMessageEscKeydown);
  body.append(errorElement);
  document.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
  body.style.overflow = 'hidden';
  //сообщение исчезает по клику на произвольную область экрана
  errorElement.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      hideMessage(evt.target.closest('.error'));
    }
  });
};

function hideMessage () {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onSuccessButtonClick);
  body.style.overflow = 'auto';
}

export {openSuccessMessage, openErrorMessage};
