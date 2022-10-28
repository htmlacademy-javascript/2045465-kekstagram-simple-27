const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');
const minScale = 25;
const maxScale = 100;
let userScale;

const overlayEffects = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat',
]

const scaleSmaller = () => {
  if(userScale > minScale) {
    userScale -= minScale;
    scaleValue.value =
    imagePreview.style.transform = // userScale.value/100
  }
};

const scaleBigger = () => {
if(userScale < maxScale) {
  userScale += minScale;
  scaleValue.value =
  imagePreview.style.transform = // userScale.value/100
}
};

buttonSmaller.addEventListener('click', () => {
  scaleSmaller();
});

buttonBigger.addEventListener('click', () => {
  scaleBigger();
});
