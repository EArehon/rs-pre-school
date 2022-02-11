let reg = `Оценка 70/60 

1) Вёрстка +10
2) При загрузке приложения на странице отображаются полученные от API изображения +10
3) Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10
4) Поиск +30
5) Очень высокое качество оформления приложения (при загрузке страницы один из заранее определнного списка набор изображений) +10
`;

console.log(reg);

const gallery = document.querySelector('.gallery');
const search = document.querySelector('.search-input');
const searchButton = document.querySelector('.icon-search');
const clearButton = document.querySelector('.icon-times');
const keyWord = ['belarus', 'tesla', 'rtx', 'gtr', 'r34', 'gti mk1'];

let key = Math.floor(Math.random() * keyWord.length);
let url = `https://api.unsplash.com/search/photos?query=${keyWord[key]}&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;

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

//clear search field
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