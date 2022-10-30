import {isEscapeKey} from './util.js';
const body = document.querySelector ('body');
const loadingFile = document.querySelector ('#upload-file');
const buttonCancel = document.querySelector('#upload-cancel');
const imageLoading = document.querySelector ('.img-upload__overlay');
const comment = document.querySelector('.text__description');
const imageForm = document.querySelector('.img-upload__form');
const buttonSubmit = document.querySelector('.img-upload__submit');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');
const effectsList = document.querySelector('.effects__list');

// Переменные для масштабирования
const minScale = 25;
const maxScale = 100;
let userScale = 100;

// Переменная для хранения текушего эффекта
let effectsPreview; // сначала эффект пустой

//Поле в фокусе - esc не работает
const isFieldFocused = () =>
  document.activeElement === comment;

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    evt.preventDefault();
    closeUserModal ();
  }
};

//ф-ция возвращает данные к исходному состоянию
const setDefaultForm = () =>{
  imagePreview.classList.remove(effectsPreview);
  scaleValue.value = '100 %';
  imagePreview.style.transform = 'scale(1)';
  comment.value = '';
};

function openUserModal () {
  // Показать окно
  imageLoading.classList.remove('hidden');
  body.classList.add('modal-open');
  // Добавить обработчик закрытия
  document.addEventListener('keydown', onModalEscKeydown);
  buttonSubmit.setAttribute('disabled', 'disabled');
}

function closeUserModal () {
  // Скрыть окно
  imageLoading.classList.add('hidden');
  body.classList.remove('modal-open');
  // Удалить обработчик
  document.removeEventListener('keydown', onModalEscKeydown);
  setDefaultForm();
}

loadingFile.addEventListener('change', () => {
  openUserModal ();
});

buttonCancel.addEventListener('click', () => {
  closeUserModal ();
});

const scaleSmaller = () => {
  if(userScale > minScale) {
    userScale -= minScale;
    scaleValue.value = `${userScale} %`;
    imagePreview.style.transform = `scale(${userScale / 100})`;
  }
};

const scaleBigger = () => {
  if(userScale < maxScale) {
    userScale += minScale;
    scaleValue.value = `${userScale} %`;
    imagePreview.style.transform = `scale(${userScale / 100})`;
  }
};

buttonSmaller.addEventListener('click', () => {
  scaleSmaller();
});

buttonBigger.addEventListener('click', () => {
  scaleBigger();
});

effectsList.addEventListener('change', (evt) => {
  imagePreview.classList.remove(effectsPreview);
  const overlayEffect = `effects__preview--${evt.target.value}`;
  imagePreview.classList.add(overlayEffect);
  effectsPreview = overlayEffect;
});

//Валидация

const pristine = new Pristine(imageForm);

// Проверка на ввод в поле коментария
imageForm.addEventListener('input', () => {
  const isValid = pristine.validate();
  if (isValid) {
    buttonSubmit.removeAttribute('disabled');
  } else {
    buttonSubmit.setAttribute('disabled', 'disabled');
  }
});
