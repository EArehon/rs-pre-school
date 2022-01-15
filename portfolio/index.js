console.log("Оценка - 110 баллов \n\nВыполненные пункты:\n  1) Вёрстка валидная. \n  2) header, main, footer \n  3) шесть элементов section (по количеству секций) \n  4) только один заголовок h1 \n  5) пять заголовков h2 \n  6) один элемент nav (панель навигации) \n  7) два списка ul > li > a (панель навигации, ссылки на соцсети) \n  8) десять кнопок button \n  9) два инпута: input type='email' и input type='tel'\n  10) один элемент textarea \n  11) три атрибута placeholder \n  12) блок header \n  13) секция hero \n  14) секция skills \n  15) секция portfolio \n  16) секция video \n  17) секция price \n  18) секция contacts \n  19) блок footer \n  20) для построения сетки используются флексы \n  21) при уменьшении масштаба страницы браузера вёрстка размещается по центру \n  22) фоновый цвет тянется на всю ширину страницы  \n  23) иконки добавлены в формате .svg. \n  24) изображения добавлены в формате .jpg \n  25) есть favicon \n  26) плавная прокрутка по якорям \n  27) ссылки в футере ведут на гитхаб автора проекта и на страницу курса https://rs.school/js-stage0/ \n  28) интерактивность включает в себя не только изменение внешнего вида курсора, но и другие визуальные эффекты, изменение цвета фона или цвета шрифта. \n  29) обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы");

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