import {isEscapeKey} from './util.js';
import {sendData} from './api.js';
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
const minScale = 25;
const maxScale = 100;
let userScale = 100;

// Переменная для хранения текушего эффекта
let currentStyle = 'none';

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
  buttonSubmit.setAttribute('disabled', 'disabled');
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
  connect: 'lower',
});

//
sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
  if (currentStyle !== 'none'){
    imagePreview.style.filter = `${specialEffect[currentStyle].style}(${effectLevelValue.value}${specialEffect[currentStyle].unit})`;
  } else {
    imagePreview.removeAttribute('style');
  }
});

const updateSlider = (chosenEffect) => {
  sliderElement.noUiSlider.updateOptions(specialEffect[chosenEffect]);
  effectLevel.classList.remove('hidden');
  sliderElement.noUiSlider.set(specialEffect[chosenEffect].start); // потому что updateOption не обнавляет start
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

//elfkdkjfbv
const ALERT_SHOW_TIME = 3000;
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

//kdjhfk

//отправка данных на сервер
const blockSubmitButton = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {
  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз');
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

// const successButton = document.querySelector('.success__button');
// const showSuccessAlert = (message) => {
//   const successMessage = document.querySelector('#success').content.querySelector('.success');
//   successMessage.textContent = message;
// };
// successButton.addEventListener('click', () => {
//   showSuccessAlert.remove();
// });

export {setUserFormSubmit, openUserModal, closeUserModal};
