import {sendData} from './api.js';
import {openSuccessMessage, openErrorMessage} from './data-message.js';
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
const uploadImage = document.querySelector('.img-upload__image');
const effectsList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level');

// Переменные для масштабирования
const MIN_SCALE = 25;
const MAX_SCALE = 100;
let userScale = 100;//значение изменяется в ходе выполнения программы

// Переменная для хранения текушего эффекта
let currentStyle = 'none';

// Доступные стили
const specialEffect = {
  'none': {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    style: '',
    unit: '',
  },
  'chrome': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    style: 'grayscale',
    unit: '',
  },
  'sepia': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    style: 'sepia',
    unit: '',
  },
  'marvin': {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    style: 'invert',
    unit: '%',
  },
  'phobos': {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    style: 'blur',
    unit: 'px',
  },
  'heat': {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    style: 'brightness',
    unit: '',
  }
};

//Поле в фокусе - esc не работает
const isCommentFocused = () => document.activeElement === comment;

const isEscapeKey = (evt) => evt.key === 'Escape';

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isCommentFocused()) {
    evt.preventDefault();
    if (!document.querySelector('.error')){
      closeUserModal();
    }
  }
};

//ф-ция возвращает данные к исходному состоянию
const setDefaultForm = () => {
  imagePreview.classList.remove(`effects__preview--${currentStyle}`);
  scaleValue.value = '100 %';
  userScale = 100;
  uploadImage.style.transform = 'scale(1)';
  comment.value = '';
  loadingFile.value = '';
};

function openUserModal () {
  // Показать окно
  effectLevel.classList.add('hidden');
  imageLoading.classList.remove('hidden');
  body.classList.add('modal-open');
  // Добавить обработчик закрытия
  document.addEventListener('keydown', onModalEscKeydown);
}

function closeUserModal () {
  // Скрыть окно
  imageLoading.classList.add('hidden');
  imagePreview.removeAttribute('style');
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
  if(userScale > MIN_SCALE) {
    userScale -= MIN_SCALE;
    scaleValue.value = `${userScale} %`;
    uploadImage.style.transform = `scale(${userScale / 100})`;
  }
};

const scaleBigger = () => {
  if(userScale < MAX_SCALE) {
    userScale += MIN_SCALE;
    scaleValue.value = `${userScale} %`;
    uploadImage.style.transform = `scale(${userScale / 100})`;
  }
};

buttonSmaller.addEventListener('click', () => {
  scaleSmaller();
});

buttonBigger.addEventListener('click', () => {
  scaleBigger();
});

// создаем слайдер
noUiSlider.create(sliderElement, {
  start: 0,
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  connect: 'lower',
});

// обработчик движения слайдера
sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
  if (currentStyle !== 'none'){
    imagePreview.style.filter = `${specialEffect[currentStyle].style}(${effectLevelValue.value}${specialEffect[currentStyle].unit})`;
  } else {
    imagePreview.removeAttribute('style');
  }
});

// обновление слайдера при смене стиля
const updateSlider = (chosenEffect) => {
  sliderElement.noUiSlider.updateOptions(specialEffect[chosenEffect]);
  effectLevel.classList.remove('hidden');
  if (chosenEffect === 'none') {
    effectLevel.classList.add('hidden');
  }
};

//наложение эффектов
effectsList.addEventListener('change', (evt) => {
  imagePreview.classList.remove(`effects__preview--${currentStyle}`);
  currentStyle = evt.target.value;
  imagePreview.classList.add(`effects__preview--${currentStyle}`);
  updateSlider(currentStyle);
});

//отправка данных на сервер
const blockSubmitButton = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = 'Опубликовать';
};

const setUserFormSubmit = () => {
  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault(); // отключили
    blockSubmitButton();
    sendData(
      () => {
        closeUserModal(); //закрытие модал
        unblockSubmitButton();
        openSuccessMessage();
        imageForm.reset();
      },
      () => {
        openErrorMessage();
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  });
};

export {setUserFormSubmit, isEscapeKey};
