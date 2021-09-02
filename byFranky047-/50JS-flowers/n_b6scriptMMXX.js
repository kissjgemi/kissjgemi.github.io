
const canvas50 = document.getElementById('canvas50');
const ctx50 = canvas50.getContext('2d');

canvas50.width = window.innerWidth;
canvas50.height = window.innerHeight;
ctx50.globalCompositeOperation = 'destination-over';

window.addEventListener('resize', function () {
    canvas50.width = window.innerWidth;
    canvas50.height = window.innerHeight;
    animate();
});

const mouse = {
    x: canvas50.width / 2,
    y: canvas50.height / 2,
    r: 150,
    show: true
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log("[ " + mouse.x + " : " + mouse.y + " ]");
});

canvas50.addEventListener('mouseleave', function (event) {
    //console.log('mouseleave');
    mouse.x = event.x;
    mouse.y = event.y;
    mouse.show = false;
});

canvas50.addEventListener('mouseenter', function (event) {
    //console.log('mouseenter');
    mouse.x = event.x;
    mouse.y = event.y;
    mouse.r = 150;
    mouse.show = true;
});

let number = 0;
let scale = 10;
let hue = Math.random() * 360;

function draw() {

    let angle = number * 0.5;
    let radius = scale * Math.sqrt(number);

    let posX = radius * Math.sin(angle) + canvas50.width / 2;
    let posY = radius * Math.cos(angle) + canvas50.height / 2;

    ctx50.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
    ctx50.strokeStyle = 'blue';
    ctx50.lineWidth = 4;
    ctx50.beginPath();
    ctx50.arc(posX, posY, 8, 0, Math.PI * 2);
    ctx50.fill();
    ctx50.stroke();

    number++;
    hue++;
}

function animate() {

    //ctx50.clearRect(0, 0, canvas50.width, canvas50.height);
    draw();
    if (number > 200) {
        return;
    }
    requestAnimationFrame(animate);
}

animate();
