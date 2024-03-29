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
        volumeBar.style.width = myVideo.volume*100 + "%";

    }else {
        myVideo.muted = true;
        mutedBtn.src = "ressources/mute.svg";
        volumeBar.style.width = '0';

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
    }else if(myVideo.webkitRequestFullscreen){
        myVideo.requestFullscreen();
    }else if(myVideo.msRequestFullscreen){
        myVideo.requestFullscreen();
    }
}

var volumeIcon = document.getElementById("volume-icon");
var volumeTooltip = document.createElement("div");
volumeTooltip.id = "volume-tooltip";
var volumeBar = document.createElement("div");
volumeBar.className = "volume-bar";
volumeTooltip.appendChild(volumeBar);
document.querySelector(".volumeBarGroup").appendChild(volumeTooltip);


// Ajout de l'événement mousemove à la barre de contrôle du volume
volumeTooltip.addEventListener("mousemove", handleVolumeChange);

let volumeBarValue;
  function handleVolumeChange(e) {
        let volumeLevel;
        // Récupération de la hauteur de la barre de contrôle du volume
        // Récupération de la position verticale de la souris dans la barre de contrôle du volume
        let volumeBarRect = volumeBar.getBoundingClientRect();
        let volumeTooltipRect = volumeTooltip.getBoundingClientRect();
        // let mousePositionY = Math.floor(e.clientY - volumeBarRect.top) + 1;
        let mousePositionX = Math.floor(e.clientX - volumeTooltipRect.left) + 1;
        console.log(mousePositionX)
        volumeBarValue = mousePositionX;
        mousePositionX < 0 ? volumeBarValue = 0 : volumeBarValue = mousePositionX;
        console.log(e.clientX +1 , volumeTooltip.getBoundingClientRect().right)
        if(e.clientX +1 >= Math.floor(volumeTooltipRect.right)) volumeBarValue = 100;
        console.log("mousePositionX" , mousePositionX)
        // change style volumeBar
        volumeBar.style.width = volumeBarValue + "%";
        // Calcul du niveau de volume en fonction de la position de la souris
        !volumeBarValue ? volumeLevel = 0 : volumeLevel = volumeBarValue.toFixed(2);
        console.log("volumeLevel", volumeLevel)
        // Mise à jour du niveau de volume
        setVolume(volumeLevel);
  }
  function setVolume(volumeLevel) {
    if(volumeLevel > 1) myVideo.volume = 1;
    myVideo.volume = volumeLevel/100;
    console.log("setVolume" , myVideo.volume)
    volumeLevel == 0 ? mutedBtn.src = "ressources/mute.svg" : mutedBtn.src = "ressources/unmute.svg" ;
}

myVideo.addEventListener('dblclick', dblclickHandler);
myVideo.addEventListener('click' , playPauseVideo)
function dblclickHandler(e){
    toggleFullScreen()
}