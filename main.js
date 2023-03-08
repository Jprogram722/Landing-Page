// Author: Jared Park
// This program will allow the user to interact with the acid was landing page
// This web app uses code from Custom Shape Divider to style the web page

const playBtn = document.querySelector('.play-btn');
const stopBtn = document.querySelector('.stop-btn');
const timeStamp = document.querySelector('.time-stamp');

playBtn.addEventListener('click', playSong);
stopBtn.addEventListener('click', stopSong);

let audio = new Audio('Sweet_Serenade.mp3');
let isPaused = true;
let sec = 0;
let min = 0;
timeStamp.innerHTML = `${min}:0${sec}/4:11`;

let time = setInterval(dt, 1000)

function dt(){
    if(!isPaused){
        sec = sec + 1;
        if(sec < 10){
            timeStamp.innerHTML = `${min}:0${sec}/4:11`;
        }
        else{
            timeStamp.innerHTML = `${min}:${sec}/4:11`;
        }
        if(sec == 60){
            sec = 0
            min += 1;
            timeStamp.innerHTML = `${min}:0${sec}/4:11`;
        }

        if(min == 4 && sec == 12){
            stopSong();
        }
    }
}

function playSong(){
    if(isPaused){
        audio.play();
        isPaused = false;
        console.log('Playing');
    }
    else{
        audio.pause();
        isPaused = true;
        console.log('Pausing');
    }
}

function stopSong(){
    audio.pause();
    audio.currentTime = 0;
    isPaused = true;
    sec = 0;
    min = 0
    timeStamp.innerHTML = `${min}:0${sec}/4:11`;
    console.log('Stoping')
}