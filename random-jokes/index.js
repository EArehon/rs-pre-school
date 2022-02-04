const url = 'https://type.fit/api/quotes';
const quotes = './quotes.json';
const quote = document.querySelector('.quote');

async function getData() {
    const res = await fetch(quotes);
    const data = await res.json();
    //console.log(data.length);
    quote.textContent = data[1].text;
    //console.log(data[1].text);
}

getData();