console.log("Оценка - 85 баллов \n\nВыполненные пункты:\n  1) Вёрстка соответствует макету. +48 \n  2) Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15 \n  3) На ширине экрана 768рх и меньше реализовано адаптивное меню +22 ");

const hamburger = document.querySelector('.hamburgerMenu');
const nav = document.querySelector('.nav');
const portfolioImages = document.querySelectorAll('.portfolioImage');
const portfolioBtns = document.querySelector('.buttonWrapper');

const seasons = ['winter', 'spring', 'summer', 'autumn'];



hamburger.addEventListener('click', toggleMenu);
nav.addEventListener('click', closeMenu);
portfolioBtns.addEventListener('click', changeImage);
seasons.forEach( element => preloadImages(element));

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
    portfolioImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
  }
}

//функция кэширования изображений
function preloadImages(season){
  for(let i = 0; i <= 6; i++) {
    const img = new Image();
    img.src = `./assets/img/${season}/${i}.jpg`;
  }
}

//функция удаления клааса 'active' у элемента ферстки
function changeClassActive(elemClass, elemTarget ){
  document.querySelectorAll(`.${elemClass}`).forEach(elem => elem.classList.remove('active'));
  elemTarget.classList.add('active');
}


