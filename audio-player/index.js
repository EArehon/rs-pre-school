// Self-check
let requirements = `Итоговая оценка: 70/60.
1. Вёрстка +10
  - вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. Кнопка Play/Pause +10
  - есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5
  - внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5
3. При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10
4. При смене аудиотрека меняется изображение - обложка аудиотрека +10
5. Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10
6. Отображается продолжительность аудиотрека и его текущее время проигрывания +10
7. Дополнительный функционал:
  - кнопка воспроизведения треков в случайном порядке +5
  - кнопка повтора всех треков / одного трека  
  - кэширование позиции трека, случайного воспроизведения и повтора треков
`;

console.log(requirements);

const playButton = document.querySelector('.play'),
      next = document.querySelector('.next'),
      prev = document.querySelector('.prev'),
      progressContainer = document.querySelector('.progress-container'),
      progress = document.querySelector('.progress'),
      fill = document.querySelector('.fill'),
      currentTimeSpan = document.querySelector('.currentTime'),
      durationSpan = document.querySelector('.duration'),
      title = document.querySelector('.title'),
      song = document.querySelector('.song'),
      cover = document.querySelector('.cover'),
      main = document.querySelector('.bg'),
      shuffle = document.querySelector('.random'),
      repeat = document.querySelector('.repeat');
      
let change = true;
let play = false;
let randomFlag = false;
let repeatFlag = false;
let repeatOnceFlag = false;
let counterRep = 0;
let flagIndexSongDuplicateNext = true,
    flagIndexSongDuplicatePrev = true;

const audio = new Audio();
audio.src = './assets/audio/Johan Skugge & Jukka Rintamaki - Battlefield 4 Main Theme.mp3';
audio.currentTime = 0;
audio.volume = 0.2;

const songs = [{song: 'Battlefield 4 Main Theme', artist: 'Johan Skugge & Jukka Rintamaki', file: 'Johan Skugge & Jukka Rintamaki - Battlefield 4 Main Theme', cover: 'bf4', duration: 86},
               {song: 'Whatever It Takes', artist: 'Hollywood Undead', file: 'Hollywood Undead - Whatever It Takes', cover: 'Whatever-It-Takes', duration: 188}, 
               {song: 'Riders on the storm', artist: 'The Doors', file: 'NFS Underground 2 - Riders on the storm ( Remix )', cover: 'doors', duration: 226},
               {song: 'Lohka', artist: 'KTrek', file: 'KTrek - lohka', cover: 'kt', duration: 166},
               {song: 'Close Eyes', artist: 'DVRST', file: 'DVRST - Close Eyes', cover: 'DVRST', duration: 132},
               {song: 'Ночные ведьмы', artist: 'RADIO TAPOK', file: 'RADIO TAPOK - witches', cover: 'tapok-witches', duration: 181},
               {song: 'Пора возвращаться домой', artist: 'БИ-2, Oxxxymiron', file: 'БИ-2, Oxxxymiron - Пора возвращаться домой', cover: 'bi2', duration: 288},
               {song: 'Blood Rage', artist: 'NightCrawler', file: 'NightCrawler - Blood Rage', cover: 'NightCrawler', duration: 257}];

let songIndex = 0; //Песня по умолчанию
let currentSong = 0;
let indexDescription = 0;
let rand = getRandom(0, songs.length-1, songs.length);

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage)
playButton.addEventListener('click', startPlay);
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
audio.addEventListener('ended', songEnded);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', setProgressPull);
progress.addEventListener('change', setProgressRelease);
shuffle.addEventListener('click', shuffleSongs);
repeat.addEventListener('click', repeatSong);


function startPlay() {
    playButton.classList.toggle('pause');
    if (!play) {
        audio.play();
        play = !play;
    }
    else {
        audio.pause();
        play = !play;
    }
}

function songEnded() {
  if (repeatOnceFlag) {
    songIndex --;
    nextSong();
  }
  else if (repeatFlag && !repeatOnceFlag){
    nextSong();
  }
  else {
    if (!repeatFlag && songIndex == songs.length - 1){
      playButton.classList.remove('pause');
      play = !play;
      songIndex = 0;
      changeData(songIndex);
    }
    else {
      nextSong();
    }
  }
}

//next song
function nextSong() {
  currentSong = songIndex;
  songIndex ++;
  if (songIndex > songs.length-1) songIndex = 0;
  
  if (randomFlag) {
    if (rand[songIndex] == currentSong && flagIndexSongDuplicateNext) {
      songIndex ++;
      if (songIndex > songs.length-1) songIndex = 0;
    }  
    flagIndexSongDuplicateNext = false;
    indexDescription = rand[songIndex];
    changeData(rand[songIndex]);
  }
  else {
    if (flagIndexSongDuplicateNext && rand[songIndex] == currentSong) {
      songIndex ++;
      if (songIndex > songs.length-1) songIndex = 0;
      
    }
    indexDescription = songIndex;
    changeData(songIndex);
    flagIndexSongDuplicateNext = false;
  }  
}

//previous song
function prevSong() {
  currentSong = songIndex;
  songIndex --;
  if (songIndex < 0) songIndex = songs.length - 1;

  if (randomFlag) {
    if (rand[songIndex] == currentSong && flagIndexSongDuplicatePrev) {
      songIndex --;
      if (songIndex < 0) songIndex = songs.length - 1;
      
    } 
    flagIndexSongDuplicatePrev = false;
    indexDescription = rand[songIndex];
    changeData(rand[songIndex]);
  }
  else {
    if (flagIndexSongDuplicatePrev && rand[songIndex] == currentSong) {
      songIndex --;
      if (songIndex < 0) songIndex = songs.length - 1;
    }
    flagIndexSongDuplicatePrev = false;
    indexDescription = songIndex;
    changeData(songIndex);
  } 
}

//update info
function changeData (index) {
  audio.src = `./assets/audio/${songs[index].file}.mp3`;
  audio.currentTime = 0;
  durationSpan.textContent = clockTime(songs[index].duration);
  title.textContent = songs[index].artist;
  song.textContent = songs[index].song;
  cover.style.backgroundImage = `url(./assets/img/${songs[index].cover}.jpg)`;
  main.style.backgroundImage = `url(./assets/img/${songs[index].cover}.jpg)`;
  if (play) audio.play();
}

//change chuffle flag
function shuffleSongs() {
  randomFlag = !randomFlag;
  flagIndexSongDuplicateNext = randomFlag;
  flagIndexSongDuplicatePrev = randomFlag;
  shuffle.classList.toggle('active');
}

//проверка состояния кнопки повтора треков
function repeatSong() {
  counterRep ++;

  switch (counterRep) {
    case 1:
      repeat.classList.add('active');
      repeatFlag = true;
      break;
    case 2:
      repeat.classList.add('active');
      repeat.classList.add('repeat-once');
      repeatOnceFlag = true;
      break;
    case 3:
      repeat.classList.remove('active');
      repeat.classList.remove('repeat-once');
      repeatOnceFlag = false;
      repeatFlag = false;
      counterRep = 0;
      break;
  }
}

//update progress bar
function updateProgress(event) {
  const {duration, currentTime} = event.srcElement;
  const progressPercent = (currentTime / songs[indexDescription].duration) * 100;
  durationSpan.textContent = clockTime(songs[indexDescription].duration);
  
  if (change) {
    currentTimeSpan.textContent = clockTime(audio.currentTime);
    fill.style.width = `${progressPercent}%`;
    progress.value = `${progressPercent}`;
  }
}

//set progress while pull input range
function setProgressPull() {
  change = false;
  const duration = audio.duration;
  const currentTime = audio.currentTime;
  currentTimeSpan.textContent = clockTime(progress.value / 100 * duration);
  fill.style.width = `${progress.value}%`;
}

//set progress after release input range
function setProgressRelease() {
  audio.currentTime = progress.value / 100 * songs[indexDescription].duration;
  
  if (play) {
    audio.play();
  }
  
  change = true;
}

//возвращает время трека в привычном для нас виде
function clockTime (duration) {
  let min = Math.floor(duration / 60);
  let sec = Math.round(duration) - min * 60;

  return String(min).padStart(2, 0) + ':' + String(sec).padStart(2, 0);
}

//получение массива для рандома
function getRandom(min, max, n) {
  let res = [];

  while(res.length < n) {
    let temp = Math.floor(Math.random() * ((max + 1) - min)) + min;
    if (res.indexOf(temp) == -1) {
      res.push(temp);
    }
  }

  return res;
}

//запись в локалстор
function setLocalStorage() {
  localStorage.setItem('randomFlagLocal', randomFlag);
  localStorage.setItem('repeatLocal', counterRep);
  localStorage.setItem('currentSong', songIndex);
}

//получение с локалстор
function getLocalStorage() {
  if(localStorage.getItem('randomFlagLocal')) {
    if (localStorage.getItem('randomFlagLocal') == 'true') {
      shuffleSongs();
    }
  }
  
  if (localStorage.getItem('repeatLocal')) {
    counterRep = localStorage.getItem('repeatLocal') - 1;
    repeatSong();
  }
  
  if (localStorage.getItem('currentSong')) {
    songIndex = localStorage.getItem('currentSong');
    indexDescription = songIndex;
    changeData(songIndex);
  }
}