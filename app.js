const btnPlay = document.querySelector('img[alt="play"]');
const myVideo = document.getElementById('myVideo');
const mutedBtn = document.querySelector('img[alt="mute"]');
const inputDuration = document.querySelector('input[name="currentTime"]');
const duration = document.querySelector('#totalDuration');

btnPlay.addEventListener('click',playPauseVideo);
mutedBtn.addEventListener('click',muteVideo);

myVideo.addEventListener('loadedmetadata', function() {
    showDuration();
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

function playPauseVideo() {
    if(myVideo.paused){
        console.log('video played');
        myVideo.play();
        btnPlay.src = "ressources/pause.svg";

    }else {
        myVideo.pause();
        btnPlay.src = "ressources/play.svg";
        console.log('video paused');
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



// inputDuration.addEventListener('change',handleDurationChange)


