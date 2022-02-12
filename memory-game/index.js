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
/* to do
1) foto for cards
2) style for modal
3) sounds fo flips */

let hasFlippedCards = false;
let firstFlip = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 1;
let leftCards = 10;
let time = 0;
let records = [];

const board = document.querySelector('.board');
const modal = document.querySelector('.modal');
const modalMoves = document.querySelector('.moves');
const modalTimes = document.querySelector('.times');
const modalRecords = document.querySelector('.records');
const newGame = document.querySelector('.new-game');

window.addEventListener('load', getLocalStorage);

//style="order:${Math.floor(Math.random()*20)}"
for (let i = 0; i < 20; i++) {
    const card = `<div class="board-card" data-framework="${Math.floor(i/2)}" >
                    <img src="./assets/svg/${Math.floor((i+2)/2)}.svg" class="board-card-front" width="357" height="452" alt="Card">
                    <img src="./assets/svg/0.svg" class="board-card-back" width="357" height="452" alt="Card bafge">
                  </div>`;
    board.insertAdjacentHTML('beforeend', card);
}

const cards = board.querySelectorAll('.board-card');
cards.forEach(card => card.addEventListener('click', flipCards));
newGame.addEventListener('click', startNewGame);

//flip cards
function flipCards () {
    if (lockBoard) return;
    if (this == firstCard) return;
    if (!firstFlip) start();

    this.classList.toggle('flip');

    if (!hasFlippedCards) {
        hasFlippedCards = true;
        firstCard = this;

        return; 
    }

    secondCard = this;

    checkMatch();
}

//check correct choise cards
function checkMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unFlipCards();
}

//correct choise cards
function disableCards () {
    firstCard.removeEventListener('click', flipCards);
    secondCard.removeEventListener('click', flipCards);

    checkEnd();
    resetBoard();
}

//wrong choise cards
function unFlipCards () {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

//clear board
function resetBoard () {
    [hasFlippedCards, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

    moves++;
}

//check end of game
function checkEnd () {
    leftCards --;

    if (leftCards == 0) {
        stop();
        console.log('Finish!');
        modal.style.display = "flex";
        modalMoves.textContent = moves;
        modalTimes.textContent = time;

        let rec = new Record(moves, time);
        //records.obj = new Record(moves, time);
        records.push(rec);
        console.log(records);

        myJSON = JSON.stringify(records);
        localStorage.setItem("testJSON", myJSON);
    }
}

//timer
function timer() {
    time ++;
    console.log(time);
}

//start timer
function start() {
   window.TimerId = window.setInterval(timer, 1000);
   firstFlip = true;
}

//stop timer
function stop() {
   window.clearInterval(window.TimerId);
}

//new record
function Record (moves, time) {
    this.time = time;
    this.moves = moves;
}

//start new game
function startNewGame() {
    location.reload();
}
 
//get data from localstorage
function getLocalStorage () {
    if (localStorage.getItem('testJSON')) {
      text = localStorage.getItem("testJSON");
      records = JSON.parse(text);

      showRecord();      
    }
}

//show records table
function showRecord() {
    for (let i = 0; i < records.length; i++){
        const rec = `<p>${i+1}. Время: ${records[i].time}. Ходы: ${records[i].moves}.</p>`

        modalRecords.insertAdjacentHTML('beforeend', rec);
    }

    deleteFirst(records);
}

//delete first record
function deleteFirst(arr) {
    if (arr.length == 10) {
        arr.splice(0, 1);
    }
}