const startingCount = 25;

let timeInSeconds = startingCount * 60;

let intervalCount;

const audioFiles = [
  "shia-dont.mp3",
  "shia-just.mp3",
  "shia-stop.mp3",
  "shia-nothing.mp3",
  "shia-yesterday.mp3",  
];
const audioBreak = [
  "wow-lvl.mp3",
  "skyrim-lvl.mp3",
  "pokemon-lvl.mp3",
  "ffxiv-lvl.mp3",
];

// Text selectors
const session = document.querySelector(".session");
const countStart = document.querySelector(".count-down");

// Button selector
const buttonStart = document.querySelector(".start");
const buttonReset = document.querySelector(".reset");

// Background selectors
const body = document.querySelector("body");
const buttonMode = document.querySelector(".mode");
const container = document.querySelector(".container");

buttonMode.addEventListener("click", function () {
  body.classList.toggle("dark");
  container.classList.toggle("dark");
  buttonMode.classList.toggle("btn-dark");
  buttonMode.classList.toggle("btn-light");
  buttonStart.classList.toggle("btn-light");
  buttonStart.classList.toggle("btn-dark");
  buttonReset.classList.toggle("btn-light");
  buttonReset.classList.toggle("btn-dark");
});

buttonStart.addEventListener("click", start);

function start() {
  intervalCount = setInterval(updateCountDown, 1000);
  session.innerHTML = "Working Session"
  
  // Random Audio Start
  let randomIndex = Math.floor(Math.random() * audioFiles.length);
  let randomAudio = audioFiles[randomIndex];

  // Random Audio Breaks
  let randomIndexBreak = Math.floor(Math.random() * audioBreak.length);
  let randomBreak = audioBreak[randomIndexBreak];

  function updateCountDown() {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;
    //If there is still time left, decrement timeInSeconds.

    if (timeInSeconds > 0) {
      timeInSeconds--;
    } else {
      //When there is no time left, stop timer.
      clearInterval(intervalCount);
    }

    if (seconds < 10) {
      countStart.innerHTML = minutes + ":0" + seconds;
    } else {
      countStart.innerHTML = minutes + ":" + seconds;
    }
    //Show time on browser Tab
    document.title = "Motivational Timer " + countStart.innerHTML;

    if (seconds === 0 && minutes === 0) {
      let audio = new Audio(
        "https://raw.githubusercontent.com/fchung7/motivational-timer/master/audio/" +
          randomBreak
      );
      audio.play();
      
    }
  }

  buttonStart.removeEventListener("click", start);
  buttonStart.innerHTML = "Pause";
  buttonStart.addEventListener("click", pause);
  let audio = new Audio(
    "https://raw.githubusercontent.com/fchung7/motivational-timer/master/audio/" +
      randomAudio
  );
  audio.play();
}


function pause() {
  buttonStart.removeEventListener("click", pause);
  clearInterval(intervalCount);
  buttonStart.innerHTML = "Start";
  buttonStart.addEventListener("click", start);
}

buttonReset.addEventListener("click", function () {
  timeInSeconds = startingCount * 60;
  clearInterval(intervalCount);
  buttonStart.innerHTML = "Start";
  buttonStart.addEventListener("click", start);
  countStart.innerHTML = startingCount + ":00";
  document.title = "Motivational Timer " + countStart.innerHTML;
});
