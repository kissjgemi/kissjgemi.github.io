const gCompositeOp = [
    'source-over',
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

const canvas8 = document.getElementById('canvas8');
var ctx8 = canvas8.getContext('2d');

canvas8.width = window.innerWidth;
canvas8.height = window.innerHeight;
ctx8.globalCompositeOperation = gCompositeOp[0];

let showMouse = false;

canvas8.addEventListener('mouseleave', function(event) {
    console.log('mouseleave');
    mouse.x = event.x;
    mouse.y = event.y;
    showMouse = false;
});

canvas8.addEventListener('mouseenter', function(event) {
    console.log('mouseenter');
    mouse.x = event.x;
    mouse.y = event.y;
    showMouse = true;
});

const mouse = {
    x: 0,
    y: 0,
    radius: 400
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;

    // console.log("[ " + mouse.x + " : " + mouse.y + " ]");
});

var mouseDownX, mouseDownY;

window.addEventListener('mousedown', function(event) {
    mouseDownX = event.x;
    mouseDownY = event.y;
    switch (event.button) {
        case 0:
            {

                break;
            }

        case 1:
            {

                break;
            }

        case 2:
            {

                break;
            }

        default:
            {

            }
    }
});

let particleArray = [];
let size = 4;
let denValue = 10;
let denMin = 4;

const maxDistance = 100;
const densityMulti = 1.2;
const slowerDiv = 20;
const transparencyLimit = 128;
const grow = 8;
const dimmColor = "rgba(0,0,0,0.05)";

function drawImage() {

    const data = ctx8.getImageData(0, 0, canvas8.width / 8, canvas8.height / 8);

    ctx8.clearRect(0, 0, canvas8.width, canvas8.height);


    class Particle {
        constructor(x, y, color, size) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.size = size;
            this.baseX = x;
            this.baseY = y;
            this.density = Math.random() * denValue + denMin;
        }
        draw() {
            ctx8.beginPath();
            ctx8.ellipse(this.x, this.y, this.size, this.size, 0, 0, Math.PI * 2, false);
            ctx8.fill();
        }
        update() {
            ctx8.fillStyle = this.color;

            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            let forceDirX = dx / distance;
            let forceDirY = dy / distance;

            let force = (maxDistance - distance) / maxDistance;
            if (force < 0) { force = 0; }

            let directionX = forceDirX * force * this.density * densityMulti;
            let directionY = forceDirY * force * this.density * densityMulti;

            if (distance < mouse.radius + this.size) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x != this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / slowerDiv;
                }
                if (this.y != this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / slowerDiv;
                }
            }
            this.draw();
        }
    }

    function init() {
        particleArray = [];

        for (let y = 0; y < data.height; y++) {
            for (let x = 0; x < data.width; x++) {
                if (data.data[y * 4 * data.width + (x * 4) + 3] > transparencyLimit) {
                    let posX = x + 1;
                    let posY = y + 1;
                    let color = "rgb(" + data.data[y * 4 * data.width + x * 4] + "," +
                        data.data[y * 4 * data.width + x * 4 + 1] + "," +
                        data.data[y * 4 * data.width + x * 4 + 2] + ")";

                    particleArray.push(new Particle(posX * grow, posY * grow, color, size));
                }
            }
        }

    }

    function animate() {
        requestAnimationFrame(animate);
        ctx8.fillStyle = dimmColor;
        ctx8.clearRect(0, 0, canvas8.width, canvas8.height);

        for (let ii = 0; ii < particleArray.length; ii++) {
            particleArray[ii].update();
        }
    }
    init();
    animate();

    window.addEventListener('resize', function() {
        canvas8.width = window.innerWidth;
        canvas8.height = window.innerHeight;
        init();
    });

}

const png = new Image();
png.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAACWCAYAAADg+AXVAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5AYZEws0P3Au1gAAAEVpVFh0Q29tbWVudAAAAAAAQ1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAKZ51HQAAAAVZJREFUeNrt00ENADAIALExUfP/niUeoIPQSrjkIv+rA4x0JQADAwYGDAwGBgwMGBgwMBgYMDBgYDAwYGDAwICBwcCAgQEDAwYGAwMGBgwMBgYMDBgYMDAYGDAwYGDAwGBgwMCAgcHAgIEBAwMGBgMDBgYMDAYGDAwYGDAwGBgwMGBgwMBgYMDAgIHBwICBAQMDBgYDAwYGDAwYGAwMGBgwMBgYMDBgYMDAYGDAwICBAQODgQEDAwYGAwMGBgwMGBgMDBgYMDAYGDAwYGDAwGBgwMCAgQEDg4EBAwMGBgMDBgYMDBgYDAwYGDAwYGAwMGBgwMBgYMDAgIEBA4OBAQMDBgYMDAYGDAwYGAwMGBgwMGBgMDBgYMDAYGDAwICBAQODgQEDAwYGDAwGBgwMGBgMDBgYMDBgYDAwYGDAwICBwcCAgQEDg4EBAwMGBgwMBgYMDBgYtmuf8QQmzuZcFAAAAABJRU5ErkJggg==";

window.addEventListener('load', (event) => {
    console.log("loaded");
    ctx8.drawImage(png, 0, 0, canvas8.width / 8, canvas8.height / 8);
    drawImage();
});
