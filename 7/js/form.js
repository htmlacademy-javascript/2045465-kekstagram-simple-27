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

// Переменные для масштабирования
const minScale = 25;
const maxScale = 100;
let userScale = 100;

// Переменная для хранения текушего эффекта
let currentStyle; // сначала эффект пустой

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
  imagePreview.classList.remove(currentStyle);
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
  sliderElement.classList.add('hidden');
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

const specialEffect = {
  'none': {range: {
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
  'sepia': {range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  style: 'sepia',
  unit: '',
  },
  'marvin': {range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  style: 'invert',
  unit: '%',
  },
  'phobos': {range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 0.1,
  style: 'blur',
  unit: 'px',
  },
  'heat': {range: {
    min: 1,
    max: 3,
  },
  start: 3,
  step: 0.1,
  style: 'brightness',
  unit: '',
  }
};

// effectsList.addEventListener('change', (evt) => {
//   if (evt.target.value === 'none') {
//     sliderElement.noUiSlider.destroy();
//   } else {
//     if (typeof sliderElement.noUiSlider !== 'undefined') {
//       sliderElement.noUiSlider.destroy();
//       noUiSlider.create(sliderElement, specialEffect[evt.target.value]);
//       //imagePreview.style.filter = `${specialEffect[style]}(${effectLevelValue[value]}${specialEffect[unit]})`;
//     } else {
//       noUiSlider.create(sliderElement, specialEffect[evt.target.value]);
//     }
//   }
// });

noUiSlider.create(sliderElement, {
  start: 0,
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
});

sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
  if (currentStyle){
    imagePreview.style.filter = `${specialEffect[currentStyle].style}(${effectLevelValue.value}${specialEffect[currentStyle].unit})`;
  }
});

const updateSlider = (chosenEffect) => {
  sliderElement.noUiSlider.updateOptions(specialEffect[chosenEffect]);
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.set(specialEffect[chosenEffect].start); // потому что updateOption не обнавляет start
  if (chosenEffect === 'none') {
    sliderElement.classList.add('hidden');
  }
};

//наложение эффектов
effectsList.addEventListener('change', (evt) => {
  imagePreview.classList.remove(`effects__preview--${currentStyle}`);
  currentStyle = evt.target.value;
  imagePreview.classList.add(`effects__preview--${currentStyle}`);
  updateSlider(currentStyle);
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
