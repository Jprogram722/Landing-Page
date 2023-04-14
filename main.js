// Author: Jared Park
// This program will allow the user to interact with the acid was landing page
// This web app uses code from Custom Shape Divider to style the web page

function updateTimeStamp(sec, min, max_sec, max_min){
    if(max_sec < 10){
        if(sec >= 10) {
            timeStamp.innerHTML = `${min}:${sec}/${max_min}:0${max_sec}`;
        }
        else{
            timeStamp.innerHTML = `${min}:0${sec}/${max_min}:0${max_sec}`;
        }
    } else {
        if(sec >= 10) {
            timeStamp.innerHTML = `${min}:${sec}/${max_min}:${max_sec}`;
        }
        else{
            timeStamp.innerHTML = `${min}:0${sec}/${max_min}:${max_sec}`;
        }
    }
}

function updateMin(sec, min){
    if(sec === 60){
      return 1;
    }
    if(sec === 60 * 2){
      return 2;
    }
    if(sec === 60 * 3){
      return 3;
    }
    if(sec === 60 * 4){
      return 4;
    }
    return min;
}

function updateProgress(e){
    let {duration, currentTime} = e.srcElement;
    const progPercent = (currentTime/duration) * 100;
    progress.style.width = progPercent+"%";
    const max_sec = Math.floor(duration - 240);
    const max_min = Math.floor(duration / 60);
    sec = Math.floor(currentTime);
    min = updateMin(sec, min);
    updateTimeStamp(sec, min, max_sec, max_min);
    if(sec >= 10){
        updateTimeStamp(sec, min, max_sec, max_min);
    }
    if(sec >= 60 * 4){
        sec = sec - 60*4;
        updateTimeStamp(sec, min, max_sec, max_min);
    }
    else if(sec >= 60 * 3){
        sec = sec - 60*3;
        updateTimeStamp(sec, min, max_sec, max_min);
    }
    else if(sec >= 60 * 2){
        sec = sec - 60*2;
        updateTimeStamp(sec, min, max_sec, max_min);
    }
    else if(sec >= 60){
        sec = sec - 60;
        updateTimeStamp(sec, min, max_sec, max_min);
    }

    if(progPercent === 100){
        playSong();
        currentTime = 0;
    }
}

const playBtn = document.querySelector('.play-btn');
const stopBtn = document.querySelector('.stop-btn');
const timeStamp = document.querySelector('.time-stamp');
const progress = document.querySelector('.progress');
const radioBtns = document.querySelectorAll('input[name="song"]');
const icon = document.querySelector('i');
const img = document.querySelector('.song-cover');
console.log(img.src);

playBtn.addEventListener('click', playSong);
stopBtn.addEventListener('click', stopSong);


let audio = new Audio(`./music/Sweet_Serenade.mp3`)
audio.addEventListener("timeupdate", updateProgress);
let isPaused = true;
let sec = 0;
let min = 0;
timeStamp.innerHTML = `${min}:0${sec}/`;

radioBtns.forEach(radioBtn => {
    radioBtn.addEventListener("click", () => {
        stopSong();
        audio = new Audio(`./music/${radioBtn.value}.mp3`);
        audio.addEventListener("timeupdate", updateProgress);
        if(radioBtn.value === "Easy_Target"){
            img.src = "./pictures/easyPingus.png";
        }
        else{
            img.src = "./pictures/Sweet_pic.png";
        }
    })
})

function playSong(){
    isPaused = !isPaused;
    if(!isPaused){
        audio.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }
    else{
        audio.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

function stopSong(){
    audio.pause();
    audio.currentTime = 0;
    isPaused = true;
    sec = 0
    min = 0
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
}