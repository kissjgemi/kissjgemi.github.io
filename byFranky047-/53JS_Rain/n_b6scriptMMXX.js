const gCompositeOp = ['source-over',
    'source-in',
    'source-out',
    'source-atop',
    'destination-over',
    'destination-in',
    'destination-out',
    'destination-atop',
    'lighter',
    'copy',
    'xor',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity'
];

const canvas53 = document.getElementById('canvas53');
var ctx53 = canvas53.getContext('2d');

canvas53.width = window.innerWidth;
canvas53.height = window.innerHeight;
ctx53.globalCompositeOperation = gCompositeOp[0];

window.addEventListener('resize', function() {
    canvas53.width = window.innerWidth;
    canvas53.height = window.innerHeight;
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
    mouse.x = undefined;
    mouse.y = undefined;
});

window.addEventListener('mousedown', function(event) {

});

let particlesArray;
const numberOfParticles = 200;

let titleElement = document.getElementById('title1');
let titleMeasurements = null;
let title = {
    x: null,
    y: null,
    width: null,
    height: null
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 1;
        this.wheight = Math.random() * 1 + 1;
        this.dX = -0.75;
        this.stepX = -0.1;
        let hue = Math.random() * 360;
        this.color = "hsl(" + hue + ", 100%, 50%)";
        this.border = "hsl(" + (hue - 180) + ", 100%, 50%)";
    }

    update() {
        if (this.y > canvas53.height) {
            titleElement.style.color = this.color;
            this.size = Math.random() * 15 + 1;
            this.y = 0 - this.size;
            this.wheight = Math.random() * 1 + 1;
            this.x = Math.random() * canvas53.width * 1.3;
            if (this.dX < -1.5){
                this.stepX = 0.2;
            }else if (this.dX > 0){
                this.stepX = -0.2;
            }
            this.dX += this.stepX;
        }
        this.wheight += 0.01;
        this.y += this.wheight;
        this.x += this.dX;

        if (this.x < title.x + title.width &&
            this.x + this.size > title.x &&
            this.y < title.y + title.height &&
            this.y + this.size > title.y
        ) {
            this.wheight *= -0.4;
            this.y -= 1;
        }
    }

    draw() {
        ctx53.fillStyle = this.color;
        ctx53.strokeStyle = this.border;
        ctx53.beginPath();
        ctx53.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx53.closePath;
        ctx53.fill();
        ctx53.stroke();
    }
}

function init() {
    titleMeasurements = titleElement.getBoundingClientRect();
    title = {
        x: titleMeasurements.left,
        y: titleMeasurements.top,
        width: titleMeasurements.width,
        height: 10
    }
    particlesArray = [];
    for (let ii = 0; ii < numberOfParticles; ii++) {
        const x = Math.random() * canvas53.width * 1.3;
        const y = Math.random() * canvas53.height;
        particlesArray.push(new Particle(x, y));
    }
}

function animate() {
    ctx53.fillStyle = 'rgba(255, 255, 255, 0.125)';
    ctx53.fillRect(0, 0, canvas53.width, canvas53.height);

    for (let ii = 0; ii < particlesArray.length; ii++) {
        particlesArray[ii].update();
        particlesArray[ii].draw();
    }
    ctx53.fillRect(title.x, title.y, title.width, title.height);
    requestAnimationFrame(animate);
}

init();
animate();
