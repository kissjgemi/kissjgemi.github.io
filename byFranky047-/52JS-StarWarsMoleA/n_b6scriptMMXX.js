const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownboard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');

let lastHole;
let timeUp;
let timeLimit = 20000;
let score;
let countdown;

function pickRandomHole() {
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if (hole === lastHole) {
        return pickRandomHole();
    }
    lastHole = hole;
    return hole;
}

function popOut() {
    const time = Math.random() * 1300 + 400;
    const hole = pickRandomHole();
    hole.classList.add('up');
    setTimeout(function() {
        hole.classList.remove('up');
        if (!timeUp) {
            popOut()
        };
    }, time);
}

function startGame() {
    timeUp = false;
    score = 0;
    countdown = timeLimit / 1000;
    scoreBoard.textContent = score;
    scoreBoard.getElementsByClassName.display = 'block';
    popOut();
    setTimeout(function() {
        timeUp = true;
    }, timeLimit);
    let startCountdown = setInterval(function() {
        countdownboard.textContent = countdown;
        countdown--;
        if (countdown < 0) {
            clearInterval(startCountdown);
            countdownboard.textContent = 'Times UP';
        }
    }, 1000);
}

startButton.addEventListener('click', startGame);

function whack(e) {
    score++;
    this.style.backgroundImage = 'url(yoda2.png)';
    this.style.pointerEvents = 'none';
    setTimeout(() => {
        this.style.backgroundImage = 'url(yoda1.png)';
        this.style.pointerEvents = 'all';
    }, 800);
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', whack));