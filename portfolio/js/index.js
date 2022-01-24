console.log("Оценка - 85 баллов \n\nВыполненные пункты:\n  1) Смена изображений в секции portfolio +25 \n  2) Перевод страницы на два языка +25 \n  3) Переключение светлой и тёмной темы +25 \n  4) Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5 \n  5) Дополнительный функционал: сложные эффекты для кнопок при наведении (в секции портфолио) +5");

import i18Obj from './translate.js';
window.addEventListener('load', getLocalStorage);

const hamburger = document.querySelector('.hamburgerMenu');
const nav = document.querySelector('.nav');
const portfolioImages = document.querySelectorAll('.portfolioImage');
const portfolioBtns = document.querySelector('.buttonWrapper');
const langSwitch = document.querySelector('.langSwitch');
const colorSwitch = document.querySelector('.colorSwitch');
const colorTheme = { 'dark' : { 'colorBlackk' : '#000', 'colorWhite' : '#fff', 'next' : 'white' }, 'white' : {'colorBlackk' : '#fff', 'colorWhite' : '#000', 'next' : 'dark' }};
const seasons = ['winter', 'spring', 'summer', 'autumn'];

langSwitch.addEventListener('click', changeLang);
hamburger.addEventListener('click', toggleMenu);
nav.addEventListener('click', closeMenu);
portfolioBtns.addEventListener('click', changeImage);
seasons.forEach( element => preloadImages(element));
colorSwitch.addEventListener('click', changeTheme);

//смена светлой темы на темную
function changeTheme(event){
  getTheme(document.body.dataset.theme);
  colorSwitch.classList.toggle('dark');
  document.body.classList.toggle('whiteTheme');
}

function getTheme(currentTheme) {
  document.documentElement.style.setProperty('--colorBlack', colorTheme[currentTheme]['colorWhite']);
  document.documentElement.style.setProperty('--colorWhite', colorTheme[currentTheme]['colorBlackk']);
  localStorage.setItem('theme', colorTheme[currentTheme]['next']);
  document.body.dataset.theme = colorTheme[currentTheme]['next'];
}

//закрытие меню по нажатию на ссылку
function closeMenu(event){
  if (event.target.classList.contains('navLink')) {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
  }
}

//открытие\закрытие меню по нажатию на иконку гамбургера
function toggleMenu() {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
}

//функция смены изображений в портфолио
function changeImage(event) {
  if(event.target.classList.contains('buttonSwitch')){
    changeClassActive('buttonSwitch', event.target);
    getImage(event.target.dataset.season);
    //portfolioImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
    localStorage.setItem('season', event.target.dataset.season);
  }
}

function getImage(season){
  portfolioImages.forEach((img, index) => img.src = `./assets/img/${season}/${index + 1}.jpg`);
}

//функция кэширования изображений
function preloadImages(season){
  for(let i = 0; i < 6; i++) {
    const img = new Image();
    img.src = `./assets/img/${season}/${i+1}.jpg`;
  }
}

//функция удаления клааса 'active' у элемента ферстки
function changeClassActive(elemClass, elemTarget ){
  document.querySelectorAll(`.${elemClass}`).forEach(elem => elem.classList.remove('active'));
  elemTarget.classList.add('active');
}

//смена языка 
function changeLang(event){
  if(event.target.classList.contains('langSwitchLink')){
    changeClassActive('langSwitchLink', event.target);
    getTranslate(event.target.dataset.i18);
    localStorage.setItem('lang', event.target.dataset.i18);
  }
}

//смена значений контента через дата атрибуты
function getTranslate(lng){
  document.querySelectorAll("[data-i18n]").forEach(elem => elem.textContent = i18Obj[lng][elem.dataset.i18n]);
  document.querySelectorAll("[data-i18nInput]").forEach(elem => elem.placeholder = i18Obj[lng][elem.dataset.i18ninput]);
}

//получение значений оформления страницы из локального хранилища
function getLocalStorage() {
  if(localStorage.getItem('lang')) {
    const lang = localStorage.getItem('lang');
    getTranslate(lang);
    changeClassActive('langSwitchLink', document.querySelector(`[data-i18=${lang}]`));
  }
  if(localStorage.getItem('season')) {
    const season = localStorage.getItem('season');
    getImage(season);
    changeClassActive('buttonSwitch', document.querySelector(`[data-season=${season}]`));
  }
  if(localStorage.getItem('theme')=='white') {
    getTheme('dark');
    colorSwitch.classList.toggle('dark');
    document.body.classList.toggle('whiteTheme');
  }
}