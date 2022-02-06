let reg = `Оценка 70/60 

1) Вёрстка +10
2) При загрузке страницы приложения отображается рандомная цитата +10
3) При перезагрузке страницы цитата обновляется (заменяется на другую) +10
4) Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) +10
5) Смена цитаты сопровождается проигрыванием звука +10
6) Можно выбрать один из двух языков отображения цитат: en/ru +10
7) Высокое качество оформления приложения +10
`;

//console.log(reg);

// TODO
// 1) logo
// 2) adaptive
// 3) array of 10 random quares

const gallery = document.querySelector('.gallery');
const search = document.querySelector('.search-input');
const searchButton = document.querySelector('.icon-search');
const clearButton = document.querySelector('.icon-times');

let url = 'https://api.unsplash.com/search/photos?query=belarus&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';

//get data from API
async function getData() {
    const res = await fetch(url);
    const data = await res.json();

    showImages(data.results);
}

getData();

document.addEventListener('keyup', (e) => {if (e.key == 'Enter') searchImages()});
//searchButton.addEventListener('click', searchImages);
clearButton.addEventListener('click', clearField);

function clearField () {
    search.value = '';
 }

//search images
function searchImages () {
  url = `https://api.unsplash.com/search/photos?query=${search.value}&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;
  gallery.innerHTML = "";
  getData();
}

//add image in gallery container
function showImages (arr) {
    for (let i = 0; i < arr.length; i++) {
        const img = document.createElement('img');
        img.classList.add('gallery-image');
        img.src = arr[i].urls.regular;
        img.alt = arr[i].alt_description;
        img.width = 1080;
        img.height = 720;

        gallery.append(img);
    }
}