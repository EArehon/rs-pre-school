let reg = `Оценка 70/60 

1) Вёрстка +10
2) Логика игры. Карточки, по которым кликнул игрок, переворачиваются согласно правилам игры +10
3) Игра завершается, когда открыты все карточки +10
4) По окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры +10
5) Результаты последних 10 игр сохраняются в local storage.
6) По клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки так же плавно переварачиваются рубашкой вверх +10
7) Высокое качество оформления приложения, добавлены звуковые эффекты +10
`;

console.log(reg);

let hasFlippedCards = false;
let firstFlip = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let leftCards = 10;
let time = 0;
let records = [];

const board = document.querySelector('.board');
const modal = document.querySelector('.modal');
const modalMoves = document.querySelector('.moves');
const modalTimes = document.querySelector('.times');
const modalRecords = document.querySelector('.records');
const newGame = document.querySelector('.new-game');

let flipSound = new Audio;
flipSound.src = './assets/audio/flip.wav';
flipSound.currentTime = 0;
flipSound.volume = 0.15;

let errSound = new Audio;
errSound.src = './assets/audio/err.mp3';
errSound.currentTime = 0;
errSound.volume = 0.08;


window.addEventListener('load', getLocalStorage);

for (let i = 0; i < 20; i++) {
    const card = `<div class="board-card" data-framework="${Math.floor(i/2)}" style="order:${Math.floor(Math.random()*20)}">
                    <img src="./assets/img/${Math.floor((i)/2)}.webp" class="board-card-front" width="357" height="452" alt="Card">
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
    playSound(flipSound);

    if (!hasFlippedCards) {
        hasFlippedCards = true;
        firstCard = this;

        return; 
    }

    secondCard = this;

    checkMatch();
}

//play sound
function playSound (sound) {
  sound.currentTime = 0;
  sound.play();
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
        playSound(errSound)
    }, 150);

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        playSound(flipSound);

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

        setTimeout(() => {
            modal.style.display = "flex";
            modalMoves.textContent = moves;
            modalTimes.textContent = clockTime(time);
    
            let rec = new Record(moves, time);
            records.push(rec);
    
            myJSON = JSON.stringify(records);
            localStorage.setItem("testJSON", myJSON);
        }, 750);

    }
}

//timer
function timer() {
    time ++;
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
      showRecord();      
    }
    else {
        const rec = `<p>Эта ваша первая игра.</p>`;
        modalRecords.insertAdjacentHTML('beforeend', rec);
    }
}

//show records table
function showRecord() {
    text = localStorage.getItem("testJSON");
    records = JSON.parse(text);

    for (let i = 0; i < records.length; i++){
        const rec = `<p>${i+1}. Время: ${clockTime(records[i].time)}. Ходы: ${records[i].moves}.</p>`

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

//return time in clock format
function clockTime (duration) {
    let min = Math.floor(duration / 60);
    let sec = Math.round(duration) - min * 60;
  
    return String(min).padStart(2, 0) + ':' + String(sec).padStart(2, 0);
}