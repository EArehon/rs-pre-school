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