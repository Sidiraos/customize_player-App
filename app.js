const btnPlay = document.querySelector('img[alt="play"]');
const myVideo = document.getElementById('myVideo');
const mutedBtn = document.querySelector('img[alt="mute"]');
const progressBar = document.querySelector('input[name="currentTime"]');
const duration = document.querySelector('#totalDuration');
const currentTime = document.querySelector('label[for="currentTime"]');
const fullScreenBtn = document.querySelector('img[alt="fullscreen"]');

btnPlay.addEventListener('click',playPauseVideo);
mutedBtn.addEventListener('click',muteVideo);

myVideo.addEventListener('loadedmetadata', function() {
    showDuration();
    progressBar.max = myVideo.duration;
});

function showDuration(){
    let durationSecond = myVideo.duration;
    let videoDurationInMinute = convertSecondInMinutes(durationSecond);
    duration.textContent = videoDurationInMinute;

}
function convertSecondInMinutes(durationSecond){
    let durationMinute = Math.floor(durationSecond / 60);
    let remainingSecond = Math.floor(durationSecond % 60)
    remainingSecond = remainingSecond < 10 ? "0" + remainingSecond : remainingSecond;

    return durationMinute + ":" + remainingSecond;
}

let synCurrentTime;
function playPauseVideo() {
    if(myVideo.paused){
        console.log('video played');
        myVideo.play();
        btnPlay.src = "ressources/pause.svg";
        synCurrentTime = setInterval(updateTime, 1000);

        function updateTime() {
            console.log(myVideo.currentTime);
            let currentTimeInMinute = convertSecondInMinutes(myVideo.currentTime);
            currentTime.textContent = currentTimeInMinute;
            progressBar.value = myVideo.currentTime;
            stopVideo();
        }

    }else {
        myVideo.pause();
        btnPlay.src = "ressources/play.svg";
        console.log('video paused');
        clearInterval(synCurrentTime);
    }
}

function muteVideo() {
    if(myVideo.muted){
        myVideo.muted = false;
        mutedBtn.src = "ressources/unmute.svg";
    }else {
        myVideo.muted = true;
        mutedBtn.src = "ressources/mute.svg";
    }
}

progressBar.addEventListener('input', handleChange);

function handleChange(e){
    myVideo.currentTime = parseInt(e.target.value);
    currentTime.textContent = convertSecondInMinutes(myVideo.currentTime);
}

function stopVideo(){
    if(myVideo.ended){
        console.log('video ended');
        clearInterval(synCurrentTime);
        btnPlay.src = "ressources/play.svg";
        myVideo.currentTime = 0;
        progressBar.value = 0;
        currentTime.textContent = "00:00";
    }
}

fullScreenBtn.addEventListener('click', toggleFullScreen);

function toggleFullScreen() {
    if(myVideo.requestFullscreen){
        myVideo.requestFullscreen();
    }else if(myVideo.mozRequestFullScreen){
        myVideo.requestFullscreen();
    }else if(myVideo.webkitSupportsFullScreen){
        myVideo.requestFullscreen();
    }else if(myVideo.msRequestFullscreen){
        myVideo.requestFullscreen();
    }
}


