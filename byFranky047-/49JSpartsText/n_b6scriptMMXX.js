
const canvas49 = document.getElementById('canvas49');

const ctx49 = canvas49.getContext('2d');


canvas49.width = window.innerWidth;
canvas49.height = window.innerHeight;

window.addEventListener('resize', function () {
    canvas49.width = window.innerWidth;
    canvas49.height = window.innerHeight;
    animate();
});

const mouse = {
    x: canvas49.width / 2,
    y: canvas49.height / 2,
    r: 150,
    show: false
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log("[ " + mouse.x + " : " + mouse.y + " ]");
});

canvas49.addEventListener('mouseleave', function (event) {
    //console.log('mouseleave');
    mouse.x = event.x;
    mouse.y = event.y;
    mouse.show = false;
});

canvas49.addEventListener('mouseenter', function (event) {
    //console.log('mouseenter');
    mouse.x = event.x;
    mouse.y = event.y;
    mouse.r = 150;
    mouse.show = true;
});

ctx49.baseLine = 'middle';
ctx49.fillStyle = 'white';
ctx49.font = '30px Verdana';
ctx49.fillText('Alfa', 0, 30);
const textImage = ctx49.getImageData(0, 0, 100, 100);

let particleArray = [];

class Particle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 40 + 5;
    }

    draw() {
        ctx49.fillStyle = 'white';
        ctx49.beginPath();
        ctx49.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx49.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dd = Math.sqrt(dx * dx + dy * dy);
        let forceDirX = dx / dd;
        let forceDirY = dy / dd;
        let force = (mouse.r - dd) / mouse.r;
        if (dd < mouse.r && mouse.show) {
            this.x -= forceDirX * force * this.density;;
            this.y -= forceDirY * force * this.density;
        } else {
            if (this.x !== this.baseX) {
                this.x -= (this.x - this.baseX) / 10;
            }
            if (this.y !== this.baseY) {
                this.y -= (this.y - this.baseY) / 10;
            }
        }
    }
}

function init() {
    particleArray = [];
    let w = textImage.width;
    let h = textImage.height;
    for (let ii = 0; ii < h; ii++) {
        for (let jj = 0; jj < w; jj++) {
            if (textImage.data[ii * 4 * w + jj * 4 + 3] > 128) {
                particleArray.push(new Particle(jj * 10, ii * 10));
            }
        }
    }
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particleArray.length - 1; a++) {
        for (let b = a; b < particleArray.length; b++) {
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particleArray[a].y - particleArray[b].y;
            let dd = Math.sqrt(dx * dx + dy * dy);
            if (dd < 30) {
                opacityValue = 1 - dd / 30;
                ctx49.strokeStyle = 'rgba(255,255,255,' + opacityValue + ')';
                ctx49.lineWidth = 2;
                ctx49.beginPath();
                ctx49.moveTo(particleArray[a].x, particleArray[a].y);
                ctx49.lineTo(particleArray[b].x, particleArray[b].y);
                ctx49.stroke();
            }
        }
    }
}

function animate() {
    ctx49.clearRect(0, 0, canvas49.width, canvas49.height);
    for (let ii = 0; ii < particleArray.length; ii++) {
        particleArray[ii].draw();
        particleArray[ii].update();
    }
    connect();
    requestAnimationFrame(animate);
}

init();
animate();
