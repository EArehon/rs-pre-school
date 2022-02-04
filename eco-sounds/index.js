console.log('60 балов \n\n  Вёрстка +10 \n  При кликах по интерактивным элементам меняется изображение +10 \n  При кликах по интерактивным элементам меняется звук +10 \n  Активный в данный момент интерактивный элемент выделяется стилем +10 \n  Кнопка Play/Pause +20  ');

const buttonPlay = document.querySelector('.play');
const nav = document.querySelector('.nav-list');
const logo = document.querySelector('.logo');
const main = document.querySelector('.main');
let isPlay = false;
const birds = ['forest', 'solovey', 'drozd', 'zarynka', 'javoronok', 'slavka'];

const audio = new Audio();
audio.currentTime = 0;
let bird = birds[0];

playAudio();

buttonPlay.addEventListener('click', startPlay);
nav.addEventListener('click', changeSound);
logo.addEventListener('click', changeSound);
birds.forEach(el => preloadImages(el));

function preloadImages(bird) {
    const img = new Image();
    img.src = `./assets/img/${bird}.jpg`;
}

function startPlay() {
    buttonPlay.classList.toggle('pause');
    
    if (!isPlay) {
      audio.play();
      isPlay = true;
    }
    else {
      audio.pause();
      isPlay = false;
    }
}

function changeSound(event) {
  if (event.target.classList.contains('nav-link') || event.target.classList.contains('logo')) {
    main.style.background = `center / cover no-repeat url(./assets/img/${event.target.dataset.bird}.jpg)`;
    changeClassActive('nav-link', event.target);
    changeClassActive('logo', event.target);
    //document.documentElement.style.setProperty('--backgroundImg', `./assets/img${event.target.dataset.bird}.jpg`); 
    bird = event.target.dataset.bird;
    playAudio();
    audio.play();
    buttonPlay.classList.add('pause');
    isPlay = true;
  }
}

function changeClassActive(elemClass, elemTarget ){
  document.querySelectorAll(`.${elemClass}`).forEach(elem => elem.classList.remove('active'));
  elemTarget.classList.add('active');
}

function playAudio() {
  audio.src = `./assets/audio/${bird}.mp3`;
  audio.currentTime = 0;
}

