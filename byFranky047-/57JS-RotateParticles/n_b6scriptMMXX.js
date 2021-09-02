const canvas = document.getElementById('canvas57');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log("[ " + mouse.x + " : " + mouse.y + " ]");
});

window.addEventListener('mouseout', function() {

});

window.addEventListener('mousedown', function(event) {

});

let numberOfParticles = 50;
let particlesArray = [];
let dimmColor = "rgba(255,255,255,0.01)";
let strokeColor = "rgba(0,0,0,0.95)";
let hue = 0;

const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop('0.2', 'red');
gradient.addColorStop('0.4', 'blue');
gradient.addColorStop('0.6', 'yellow');
gradient.addColorStop('0.8', 'pink');

const gradient2 = ctx.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop('0.2', 'black');
gradient.addColorStop('0.5', 'red');
gradient.addColorStop('0.8', 'white');

const pumpkin = new Image();
pumpkin.src = 'pumpkin1.png';
const sprite = new Image();
sprite.src = 'pumpkins.png';

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 1.1;
        this.size = Math.random() * 60 + 30;
        this.speed = this.size / 20 + Math.random() * 2 + 1;
        this.angle = Math.random() * 360;
        this.spin = Math.random() < 0.5 ? -1 : 1;
        this.frameX = Math.floor(Math.random() * 3);
        this.frameY = Math.floor(Math.random() * 3);
        this.spriteSize = 900 / 3;
    }

    draw() {
        //ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 360 * this.spin);
        ctx.drawImage(sprite, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }

    update() {
        this.angle += 2;
        this.y += this.speed;
        if (this.y >= canvas.height + this.size / 2) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
            this.size = Math.random() * 60 + 30;
            this.speed = this.size / 20 + Math.random() * 2 + 1;
            this.angle = Math.random() * 360;
            this.spin = Math.random() < 0.5 ? -1 : 1;
            this.frameX = Math.floor(Math.random() * 3);
            this.frameY = Math.floor(Math.random() * 3);
        }
    }
}

function init() {
    for (let ii = 0; ii < numberOfParticles; ii++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let ii = 0; ii < numberOfParticles; ii++) {
        if(particlesArray[ii].size < 50){
            particlesArray[ii].draw();
            particlesArray[ii].update();
        }
    }
    for (let ii = 0; ii < numberOfParticles; ii++) {
        if(particlesArray[ii].size >= 50 && particlesArray[ii].size < 70){
            particlesArray[ii].draw();
            particlesArray[ii].update();
        }
    }
    for (let ii = 0; ii < numberOfParticles; ii++) {
        if(particlesArray[ii].size >= 70){
            particlesArray[ii].draw();
            particlesArray[ii].update();
        }
    }
    requestAnimationFrame(animate);
}

init();
animate();
