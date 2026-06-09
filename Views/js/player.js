const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const timeLine = document.getElementById("time-line");
const timeLineFill = document.getElementById("time-line_fill");
const repeat = document.getElementById("repeat");
const back = document.getElementById("back");
const like = document.getElementById("main-navar_like");
const titlePlayer = document.getElementById("player-item-title")
const captionPlayer = document.getElementById("player-item-caption")
const items = Array.from(document.querySelectorAll(".main-item_audio"));

let currentMusic = 0;
let currentAudio = items[currentMusic];

const infoMusic = () => {

    let fullName = currentAudio.getAttribute("src").split("_");
    let t_c = fullName[1].split("-");

    captionPlayer.textContent = t_c[0];
    titlePlayer.textContent = t_c[1];
}

const playMusic = () => {
    if (play.getAttribute("src").includes("../../images/play-icon.png")) {
        currentAudio.play();
        infoMusic()
        play.src = "../../images/stop.png"
    }
    else {
        currentAudio.pause();
        play.setAttribute("src", "../../images/play-icon.png");
    }
}

const nextMusic = () => {
    currentAudio.pause();
    currentAudio.currentTime = 0;

    currentMusic = (currentMusic + 1) % items.length;
    currentAudio = items[currentMusic];
    play.src = "../../images/stop.png"

    infoMusic()

    currentAudio.play();

}

const previousMusic = () => {
    if (currentAudio.currentTime > 3) {
        currentAudio.currentTime = 0;
        currentAudio.play();
    } else {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentMusic = (currentMusic - 1 + items.length) % items.length;
        currentAudio = items[currentMusic];
    }
    play.src = "../../images/stop.png"
    infoMusic()
    currentAudio.play()

}

const progMusic = () => {
    if (currentAudio.duration) {
        let percent = (currentAudio.currentTime / currentAudio.duration) * 100;

        timeLineFill.style.width = percent + "%"
    }
}

const endMusic = () => {
    if (repeat.getAttribute("src").includes("../../images/repeat-off.png")) {
        nextMusic();
    } else {
        currentAudio.currentTime = 0;
        currentAudio.play();
    }
}

const backMusic = () => {
    history.back();
}

const repeatMusic = () => {
    if (repeat.getAttribute("src").includes("../../images/repeat-off.png")) {
        repeat.src = "../../images/repeat-on.png";
    } else {
        repeat.src = "../../images/repeat-off.png";
    }
}

const likeMusic = () => {
    if (like.getAttribute("src").includes("../../images/like.png")) {
        like.src = "../../images/liked.png";
    } else {
        like.src = "../../images/like.png";
    }
}


items.forEach(audio => {
    audio.addEventListener("timeupdate", progMusic);
});

items.forEach(audio => {
    audio.addEventListener("ended", endMusic);
});

timeLine.addEventListener("click", (e) => {
    let Position = e.offsetX / timeLine.clientWidth;
    currentAudio.currentTime = Position * currentAudio.duration;
});

play.addEventListener("click", playMusic)
next.addEventListener("click", nextMusic)
previous.addEventListener("click", previousMusic)
back.addEventListener("click", backMusic)
repeat.addEventListener("click", repeatMusic)
like.addEventListener("click", likeMusic)