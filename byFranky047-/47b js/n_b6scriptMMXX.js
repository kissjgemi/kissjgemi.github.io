
const canvas47 = document.getElementById('canvas47');
const ctx47 = canvas47.getContext('2d');

canvas47.width = window.innerWidth;
canvas47.height = window.innerHeight;

window.addEventListener('resize', function () {
    canvas47.width = window.innerWidth;
    canvas47.height = window.innerHeight;
    animate();
});

const mouse = {
    x: canvas47.width / 2,
    y: canvas47.height / 2,
    radius: 60,
    angle: 0
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log("[ " + mouse.x + " : " + mouse.y + " ]");
});

canvas47.addEventListener('mouseleave', function (event) {
    console.log('mouseleave');
    mouse.x = event.x;
    mouse.y = event.y;
    showMouse = false;
});

canvas47.addEventListener('mouseenter', function (event) {
    console.log('mouseenter');
    mouse.x = event.x;
    mouse.y = event.y;
    showMouse = true;
});

let showMouse = false;

let numberOfParticles = canvas47.width * canvas47.height / 10000;
let particles = [];
let dimmColor = "rgba(255,255,255,0.01)";
let strokeColor = "rgba(0,0,0,0.95)";
let hue = 0;

ctx47.baseLine = 'middle';

let letters = ['E', 'U', 'R', 'O', 'G', 'Y', 'M', '2', '4', 'e', 'u', 'r', 'o', 'g', 'y', 'm'];
let letterNr = 0;

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
sprite.src = 'planets.png';

class Particle {
    constructor(x, y, r) {
        this.r = r;
        this.x = x;
        this.y = y;
        this.color = 'hsl(' + hue + ',100%,50%)';
        this.txt = letters[letterNr];
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        letterNr++;
        if (letterNr >= letters.length) {
            letterNr = 0;
        }
        this.size = 250;
        this.frameX = Math.floor(Math.random() * 4);
        this.frameY = Math.floor(Math.random() * 4);
    }

    draw() {
        ctx47.drawImage(sprite,
            this.frameX * this.size, this.frameY * this.size, this.size, this.size,
            this.x - this.r, this.y - this.r, 2 * this.r, 2 * this.r);
    }
    auto() {
        if (!showMouse) {
            mouse.x = mouse.radius * canvas47.width / 180 * Math.sin(mouse.angle * Math.PI / 180) + canvas47.width / 2;
            mouse.y = mouse.radius * canvas47.height / 180 * Math.cos(mouse.angle * Math.PI / 240) + canvas47.height / 2;
        }
        mouse.angle += 0.02;
    }
}

function addParticle() {
    let overlap = true;
    let protection = 1000;
    let counter = 0;

    while (counter < protection && overlap) {
        counter++;
        let randomAngle = Math.random() * 2 * Math.PI;
        let randomRadius = mouse.radius * Math.random();
        let particle = {
            x: mouse.x + randomRadius * Math.cos(randomAngle),
            y: mouse.y + randomRadius * Math.sin(randomAngle),
            r: Math.floor(Math.random() * (mouse.radius - 10) + 10)
        }
        overlap = false;
        for (let ii = 0; ii < particles.length; ii++) {
            let dx = particle.x - particles[ii].x;
            let dy = particle.y - particles[ii].y;
            let d = Math.sqrt(dx * dx + dy * dy);
            if (d < particle.r + particles[ii].r) {
                overlap = true;
                break;
            }
        }
        if (!overlap) {
            particles.unshift(new Particle(
                particle.x, particle.y, particle.r));
        }
    }
    console.log(particles.length);
}

function animate() {

    //ctx47.fillStyle = dimmColor;
    //ctx47.fillRect(0,0,innerWidth,innerHeight);
    ctx47.clearRect(0, 0, canvas47.width, canvas47.height);

    for (let ii = 0; ii < particles.length; ii++) {
        particles[ii].draw();
        particles[ii].auto();
    }
    if (particles.length >= numberOfParticles) {
        particles.pop();
    }
    addParticle();
    hue++;
    requestAnimationFrame(animate);
}

animate();

