const canvas = document.getElementById('canvas');
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

let numberOfParticles = 200;
let particlesArray = [];
ctx.lineCap = 'round';

let grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
grd.addColorStop(0, 'darkred');
grd.addColorStop(0.7, 'red');
grd.addColorStop(0.9, 'rgba(255, 0, 0, 0.1)');


const sprite = new Image();
sprite.src = 'pumpkins.png';

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height + canvas.height;
        this.size = Math.random() * 100 + 30;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = -(this.size / 20 + Math.random() * 5 + 1);
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
        this.angle += 5;
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.size > 1) {
            this.size -= 0.5;
        }
    }
}

function init() {
    for (let ii = 0; ii < numberOfParticles; ii++) {
        particlesArray.push(new Particle());
    }
}

function connect() {
    for (let ii = 0; ii < particlesArray.length; ii++) {
        lineWidth = particlesArray[ii].size / 4;
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.moveTo(particlesArray[ii].x - lineWidth, particlesArray[ii].y - lineWidth);
        ctx.lineTo(particlesArray[ii].x + lineWidth, particlesArray[ii].y + lineWidth);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.fill();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let ii = 0; ii < particlesArray.length; ii++) {
        if (particlesArray[ii].size < 1) {
            particlesArray.splice(ii, 1);
        }
    }
    while (particlesArray.length < numberOfParticles) {
        particlesArray.push(new Particle());

    }
    connect();
    for (let ii = 0; ii < particlesArray.length; ii++) {
        if (particlesArray[ii].size < 50) {
            particlesArray[ii].draw();
            particlesArray[ii].update();
        }
    }
    for (let ii = 0; ii < particlesArray.length; ii++) {
        if (particlesArray[ii].size >= 50 && particlesArray[ii].size < 70) {
            particlesArray[ii].draw();
            particlesArray[ii].update();
        }
    }
    for (let ii = 0; ii < particlesArray.length; ii++) {
        if (particlesArray[ii].size >= 70) {
            particlesArray[ii].draw();
            particlesArray[ii].update();
        }
    }
    requestAnimationFrame(animate);
}

init();
animate();