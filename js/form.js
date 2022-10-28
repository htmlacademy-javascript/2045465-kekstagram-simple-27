import {isEscapeKey} from './util.js';
const body = document.querySelector ('body');
const loadingFile = document.querySelector ('#upload-file');
const buttonCancel = document.querySelector('#upload-cancel');
const imageLoading = document.querySelector ('.img-upload__overlay');
const comment = document.querySelector('.text__description');
const imageForm = document.querySelector('.img-upload__form');

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal ();
  }
};

function openUserModal () {
  imageLoading.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onModalEscKeydown);
}

function closeUserModal () {
  imageLoading.classList.add('hidden');
  body.classList.remove('modal-open');
  loadingFile.value = ''; //???
  comment.value = '';

  document.removeEventListener('keydown', onModalEscKeydown);
}

loadingFile.addEventListener('click', () => {
  openUserModal ();
});

buttonCancel.addEventListener('click', () => {
  closeUserModal ();
});

const pristine = new Pristine(imageForm);

imageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
