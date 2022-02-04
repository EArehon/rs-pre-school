const video = document.querySelector('.videoSrc');
const playButton = document.querySelector('.playButton');
const cover = document.querySelector('.cover');
const play = document.querySelector('.play');
const progress = document.querySelector('.progress');
const volume = document.querySelector('.volume');
const volumeBar = document.querySelector('.volumeBar');

let pause = true;
let start = true;
let change = true;

video.volume = 0.5;

video.addEventListener('click', startPlay);
playButton.addEventListener('click', startPlay);
play.addEventListener('click', startPlay);
video.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', updateProgressPull);
progress.addEventListener('change', updateProgressRelease);
volume.addEventListener('click', muteVolume);
volumeBar.addEventListener('input', updateVolumePull);
video.addEventListener('ended', startPlay)



updateVolumePull();

function updateVolumePull () {
    const value = volumeBar.value;
    video.volume = value;
    video.muted = false;
    if (video.volume == 0) {
        volume.classList.add('muted');
    }
    else {
        volume.classList.remove('muted');
    }
    volumeBar.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value*100}%, #fff ${value*100}%, white 100%)`;
}

//отключение звука по кнопке
function muteVolume () {
    video.muted = !video.muted;
    volume.classList.toggle('muted');
}


function startPlay() {
    
    if (pause) {
        video.play();
        pause = !pause;
        playButton.classList.toggle('displayNone');
        play.classList.toggle('pause');
        
        if (start) {
          start = false;
          cover.classList.add('visuallyhidden');
          cover.addEventListener('transitionend', function(e) {
            cover.classList.add('displayNone')});
        }
    }
    else {
        video.pause();
        pause = !pause;
        playButton.classList.toggle('displayNone');
        play.classList.toggle('pause');
    }
}

//изменение прогресс бара при воспроизведении
function updateProgress () {
    if (change) {
        progress.value = video.currentTime / video.duration * 100;
        progress.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${progress.value}%, #fff ${progress.value}%, white 100%)`;
    }
}

//изменение видео при перетаскивании
function updateProgressPull () {
    //this.value = video.currentTime / video.duration * 100;
    change = false;
    
    const value = this.value;
    this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value}%, #fff ${value}%, white 100%)`;
}

//изменение видео при отпускании
function updateProgressRelease () {
  video.currentTime = progress.value / 100 * video.duration;
  change = true;
}

