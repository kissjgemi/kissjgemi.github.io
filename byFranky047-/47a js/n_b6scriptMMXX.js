
const canvas47 = document.getElementById('canvas47');

const ctx47 = canvas47.getContext('2d');


canvas47.width = window.innerWidth;
canvas47.height = window.innerHeight;

window.addEventListener('resize', function () {
    canvas47.width = window.innerWidth;
    canvas47.height = window.innerHeight;
    init();
});

const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log("[ " + mouse.x + " : " + mouse.y + " ]");
});

window.addEventListener('mouseout', function () {

});

window.addEventListener('mousedown', function (event) {

});

let numberOfParticles = 200;
let particlesArray = [];
let dimmColor = "rgba(255,255,255,0.01)";
let strokeColor = "rgba(0,0,0,0.95)";
let hue = 0;

const gradient = ctx47.createLinearGradient(0, 0, canvas47.width, 0);
gradient.addColorStop('0.2', 'red');
gradient.addColorStop('0.4', 'blue');
gradient.addColorStop('0.6', 'yellow');
gradient.addColorStop('0.8', 'pink');

const gradient2 = ctx47.createLinearGradient(0, 0, canvas47.width, 0);
gradient.addColorStop('0.2', 'black');
gradient.addColorStop('0.5', 'red');
gradient.addColorStop('0.8', 'white');

const sprite = new Image();
sprite.src = 'celebrities.png';

class Particle {
    constructor() {
        this.r = 5 * (Math.random() * 25 + 2);
        this.x = Math.random() * (canvas47.width - this.r * 2) + this.r;
        this.y = Math.random() * (canvas47.height - this.r * 2) + this.r;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.size = 250;
        this.frameX = Math.floor(Math.random() * 4);
        this.frameY = Math.floor(Math.random() * 4);
    }

    draw() {
        ctx47.beginPath();
        ctx47.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        // ctx47.fillStyle = "hsl(" + hue + ", 100%, 50%)";
        ctx47.fillStyle = gradient;
        ctx47.fill();
        //ctx47.strokeStyle = strokeColor;
        ctx47.strokeStyle = gradient2;
        ctx47.stroke();

        ctx47.drawImage(sprite,
            this.frameX * this.size, this.frameY * this.size, this.size, this.size,
            this.x - this.r, this.y - this.r, 2 * this.r, 2 * this.r);
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x + this.r > canvas47.width ||
            this.x - this.r < 0) {
            this.speedX *= -1;
        }
        if (this.y + this.r > canvas47.height ||
            this.y - this.r < 0) {
            this.speedY *= -1;
        }
        this.draw();
    }
}

function init() {
    particlesArray = [];
    for (let ii = 0; ii < numberOfParticles; ii++) {
        particlesArray.push(new Particle());
    }
}

function animate() {

    //ctx47.fillStyle = dimmColor;
    //ctx47.fillRect(0,0,innerWidth,innerHeight);
    ctx47.clearRect(0, 0, innerWidth, innerHeight);

    for (let ii = 0; ii < particlesArray.length; ii++) {
        particlesArray[ii].update();
    }
    //hue++;
    requestAnimationFrame(animate);
}

init();
animate();

