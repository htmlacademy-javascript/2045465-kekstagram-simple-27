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
const uploadImage = document.querySelector('.img-upload__image');
const effectsList = document.querySelector('.effects__list');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const elementRadio = document.querySelector('.effects__radio ');

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
const setDefaultForm = () => {
  imagePreview.classList.remove(effectsPreview);
  scaleValue.value = '100 %';
  userScale = 100;
  uploadImage.style.transform = 'scale(1)';
  comment.value = '';
  loadingFile.value = '';
};

function openUserModal () {
  // Показать окно
  imageLoading.classList.remove('hidden');
  body.classList.add('modal-open');
  // Добавить обработчик закрытия
  document.addEventListener('keydown', onModalEscKeydown);
  buttonSubmit.setAttribute('disabled', 'disabled');
  sliderElement.noUiSlider.destroy();
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
    uploadImage.style.transform = `scale(${userScale / 100})`;
  }
};

const scaleBigger = () => {
  if(userScale < maxScale) {
    userScale += minScale;
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

//наложение эффектов
effectsList.addEventListener('change', (evt) => {
  imagePreview.classList.remove(effectsPreview);
  const overlayEffect = `effects__preview--${evt.target.value}`;
  imagePreview.classList.add(overlayEffect);
  effectsPreview = overlayEffect;
});

//слайдер
const specialEffect = {
  'none': {range: {
    min: 0,
    max: 1,
  }
  },
  'chrome': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  'sepia': {range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  },
  'marvin': {range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  },
  'phobos': {range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 0.1,
  },
  'heat': {range: {
    min: 1,
    max: 3,
  },
  start: 3,
  step: 0.1,
  }
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 0.1,
});

sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
});

// effectsList.addEventListener('change', (evt) => {
//   if (evt.target.value === 'none') {
//     sliderElement.noUiSlider.destroy();
//   } else {
//     if (typeof sliderElement.noUiSlider !== 'undefined') {
//       sliderElement.noUiSlider.updateOptions(specialEffect[evt.target.value]);
//       sliderElement.noUiSlider.set(specialEffect[evt.target.value].start);
//     } else {
//       noUiSlider.create(sliderElement, specialEffect[evt.target.value]);
//     }
//   }
// });

effectsList.addEventListener('change', (evt) => {
  if (evt.target.value === 'none') {
    sliderElement.noUiSlider.destroy();
  } else {
    if (typeof sliderElement.noUiSlider !== 'undefined') {
      sliderElement.noUiSlider.destroy();
      noUiSlider.create(sliderElement, specialEffect[evt.target.value]);
    } else {
      noUiSlider.create(sliderElement, specialEffect[evt.target.value]);
    }
  }
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
