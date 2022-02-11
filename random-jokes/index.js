let reg = `Оценка 70/60 

1) Вёрстка +10
2) При загрузке страницы приложения отображается рандомная цитата +10
3) При перезагрузке страницы цитата обновляется (заменяется на другую) +10
4) Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) +10
5) Смена цитаты сопровождается проигрыванием звука +10
6) Можно выбрать один из двух языков отображения цитат: en/ru +10
7) Высокое качество оформления приложения +10
 - дизайн отличающийся от демо в лучшую сторону +5
 - выбранный язык цитаты хранится в локальном хранилище +5
`;

console.log(reg);

const quotesEn = 'https://type.fit/api/quotes';
const quotesRu = './assets/quotes.json';

const quote = document.querySelector('.quote');
const button = document.querySelector('.button');
const langSwitch = document.querySelector('.lang');

let lang = 'ru';

const i18obj = {en: 'Click me!',
                ru: 'Нажми меня!',
            };

const audio = new Audio;
audio.src = './assets/wtbd.mp3';
audio.volume = 0.2;

button.addEventListener('click', changeQuote);
langSwitch.addEventListener('click', changeLang);
window.addEventListener('load', getLocalStorage);

//получение данных из API или JSON файла
async function getData() {
    url = lang == 'ru' ? quotesRu : quotesEn;
    const res = await fetch(url);
    const data = await res.json();
    quote.textContent = data[getRandom(data.length)].text;
}

if (!localStorage.getItem('lang')) {
    getData();
}


//смена активного языка
function changeLang(event) {
    if (event.target.classList.contains('lang-link') && lang != event.target.dataset.i18n) {
        changeClassActive('lang-link', event.target);
        lang = event.target.dataset.i18n;
        localStorage.setItem('lang', lang);
        button.textContent = i18obj[lang];
        getData();
    }
}

//смена цитаты по нажатию кнопки
function changeQuote () {
    audio.currentTime = 0;
    audio.play();
    getData();
}

//получение рандомного числа
function getRandom(max) {
  return Math.floor(Math.random() * (max));
}

//смена активного класа
function changeClassActive(elemClass, elemTarget ){
    document.querySelectorAll(`.${elemClass}`).forEach(elem => elem.classList.remove('active'));
    elemTarget.classList.add('active');
}

//get data from localstorage
function getLocalStorage () {
    if (localStorage.getItem('lang')) {
      lang = localStorage.getItem('lang');
      changeClassActive('lang-link', document.querySelector(`[data-i18n=${lang}]`));
      button.textContent = i18obj[lang];
      getData();      
    }
}