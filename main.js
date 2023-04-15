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

// updates the min varibale depending on how many seconds into the song user is
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
    progress.style.width = progPercent+"%"; // updates progress bar
    
    // gets the songs duration in min and sec
    const max_sec = Math.floor(duration - 240);
    const max_min = Math.floor(duration / 60);
    
    // gets how many seconds and minutes into the song user is
    time.sec = Math.floor(currentTime);
    time.min = updateMin(time.sec, time.min);
    updateTimeStamp(time.sec, time.min, max_sec, max_min);
    if(time.sec >= 10){
        updateTimeStamp(time.sec, time.min, max_sec, max_min);
    }
    if(time.sec >= 60 * 4){
        time.sec = time.sec - 60*4;
        updateTimeStamp(time.sec, time.min, max_sec, max_min);
    }
    else if(time.sec >= 60 * 3){
        time.sec = time.sec - 60*3;
        updateTimeStamp(time.sec, time.min, max_sec, max_min);
    }
    else if(time.sec >= 60 * 2){
        time.sec = time.sec - 60*2;
        updateTimeStamp(time.sec, time.min, max_sec, max_min);
    }
    else if(time.sec >= 60){
        time.sec = time.sec - 60;
        updateTimeStamp(time.sec, time.min, max_sec, max_min);
    }

    // Once Song Finishes
    if(progPercent === 100){
        playSong();
        currentTime = 0;
    }
}

// Gets Elements from the DOM or HTML file
const playBtn = document.querySelector('.play-btn');
const stopBtn = document.querySelector('.stop-btn');
const timeStamp = document.querySelector('.time-stamp');
const progress = document.querySelector('.progress');
const radioBtns = document.querySelectorAll('input[name="song"]');
const icon = document.querySelector('i');
const img = document.querySelector('.song-cover');

// Adds event listeners to the play and stop button
playBtn.addEventListener('click', playSong);
stopBtn.addEventListener('click', stopSong);

// init audio as sweet serenade
let audio = new Audio(`./music/Sweet_Serenade.mp3`);
audio.addEventListener("timeupdate", updateProgress);

// init song as paused
let isPaused = true;

// init time as 0 seconds and 0 mintues
let time ={
    min: 0,
    sec: 0
}

// updates timestamp in the dom to the current min and secs into the song
timeStamp.innerHTML = `${time.min}:0${time.sec}/`;

// adds event listeners to each radio button
radioBtns.forEach(radioBtn => {
    radioBtn.addEventListener("click", () => {
        stopSong();

        // toggles which song is queued to played
        audio = new Audio(`./music/${radioBtn.value}.mp3`);
        
        // updates the time the songs been playing
        audio.addEventListener("timeupdate", updateProgress);
        
        // Changes what image to show based in which radio button is toggled
        if(radioBtn.value === "Easy_Target"){
            img.src = "./pictures/easyPingus.png";
        }
        else{
            img.src = "./pictures/Sweet_pic.png";
        }
    })
})


function playSong(){
    isPaused = !isPaused; // changes between paused and unpaused
    if(!isPaused){
        audio.play();

        //Switchs icons on the play/pause button
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
    audio.currentTime = 0; // resets the time
    isPaused = true;
    time.sec, time.min = 0 // resets time for timeStamp
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
}