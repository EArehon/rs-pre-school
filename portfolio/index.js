console.log("Оценка - 85 баллов \n\nВыполненные пункты:\n  1) Вёрстка соответствует макету. +48 \n  2) Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15 \n  3) На ширине экрана 768рх и меньше реализовано адаптивное меню +22 ");

const hamburger = document.querySelector('.hamburgerMenu');
const nav = document.querySelector('.nav');


function toggleMenu() {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
  }

hamburger.addEventListener('click', toggleMenu);

nav.addEventListener('click', closeMenu);

function closeMenu(event){
  if (event.target.classList.contains('navLink')) {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
  
  }
}


const portfolioBtn = document.querySelector('.buttonSwitch1');
const portfolioImages = document.querySelectorAll('.portfolioImage');

//portfolioBtn.addEventListener('click', () => {portfolioImages.forEach((img, index) => img.src = `./assets/img/winter/${index + 1}.jpg`)});

const portfolioBtns = document.querySelector('.buttonWrapper');

function changeImage(event) {
  if(event.target.classList.contains('buttonSwitch')){
    //portfolioBtns.forEach(element => element.classList.remove('active'));
    portfolioImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
  }
}

function changeClassActive(){

}

portfolioBtns.addEventListener('click', changeImage);

const seasons = ['winter', 'spring', 'summer', 'autumn'];

seasons.forEach( element => preloadImages(element));

function preloadImages(season){
  for(let i = 0; i <= 6; i++) {
    const img = new Image();
    img.src = `./assets/img/${season}/${i}.jpg`;
  }
}





