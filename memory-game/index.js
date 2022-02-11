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

let hasFlippedCards = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 1;
let leftCards = 10;

const board = document.querySelector('.board');
const modal = document.querySelector('.modal');
const modalMoves = document.querySelector('.moves');

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

function flipCards () {
    if (lockBoard) return;
    if (this == firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlippedCards) {
        hasFlippedCards = true;
        firstCard = this;

        console.log(moves);

        return; 
    }

    secondCard = this;

    checkMatch();
}

function checkMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unFlipCards();
}

function disableCards () {
    firstCard.removeEventListener('click', flipCards);
    secondCard.removeEventListener('click', flipCards);

    checkEnd();
    resetBoard();
}

function unFlipCards () {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard () {
    [hasFlippedCards, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

    moves++;
}

function checkEnd () {
    leftCards --;

    if (leftCards == 0) {
        console.log('Finish!');
        modal.style.display = "flex";
        modalMoves.textContent = moves;
    }
}