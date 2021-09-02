
const gCompositeOp = [ 'source-over',
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
                       'luminosity'];

const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.globalCompositeOperation = gCompositeOp[0];

const canvas6 = document.getElementById('canvas6');
if (canvas6.getContext) {
  var ctx6 = canvas6.getContext('2d');
}

canvas6.width = window.innerWidth;
canvas6.height = window.innerHeight;
ctx6.globalCompositeOperation = gCompositeOp[0];

window.addEventListener('resize', function(){
    canvas6.width = window.innerWidth;
    canvas6.height = window.innerHeight;
    eyesArray = [];
    init();
});

const mouse = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log("[ " + mouse.x + " : " + mouse.y + " ]");
});

canvas6.addEventListener('mouseleave', function(event){
    console.log('mouseleave');
    mouse.x = event.x;
    mouse.y = event.y;
    showMouse = false;
});

canvas6.addEventListener('mouseenter', function(event){
    console.log('mouseenter');
    mouse.x = event.x;
    mouse.y = event.y;
    showMouse = true;
});

let showMouse = false;

let numberOfEyes = canvas6.width * canvas6.height / 30000;
let eyesArray = [];
let theta;

var eyeMaxD, eyeMinD;
if (canvas6.width > canvas6.height){
    eyeMaxD = canvas6.height/5;
    eyeMinD = canvas6.height/15;
} else {
    eyeMaxD = canvas6.width/5;
    eyeMinD = canvas6.width/15;
}
let strokeColor = "red";
let eyeColor = "Snow";
let irisColor = "LightSteelBlue";
let pupilColor = "black";
let mouseColor = "gold";
let mouseD = 10;

class Eye {
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
    }

    draw(){
        ctx6.beginPath();
        ctx6.ellipse(this.x, this.y, this.r, this.r, 0, 0, Math.PI * 2, false);
        ctx6.fillStyle = eyeColor;
        ctx6.fill();
        ctx6.strokeStyle = strokeColor;
        ctx6.stroke();


        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;

        theta = Math.atan2(dy, dx);

        let iris_x = this.x + Math.cos(theta) * this.r / 14;
        let iris_y = this.y + Math.sin(theta) * this.r  * 1.6 / 14;
        let iris_r = this.r / 1.4;
        ctx6.beginPath();
        ctx6.ellipse(iris_x, iris_y, iris_r, iris_r, 0, 0, Math.PI * 2, false);
        ctx6.fillStyle = irisColor;
        ctx6.fill();
        ctx6.stroke();

        let pupil_x = this.x + Math.cos(theta) * this.r / 2.4;
        let pupil_y = this.y + Math.sin(theta) * this.r / 3.2;
        let pupil_r = this.r / 4;
        ctx6.beginPath();
        ctx6.ellipse(pupil_x, pupil_y, pupil_r, pupil_r, 0, 0, Math.PI * 2, false);
        ctx6.fillStyle = pupilColor;
        ctx6.fill();

        if (showMouse) {
            ctx6.beginPath();
            ctx6.ellipse(mouse.x, mouse.y, mouseD, mouseD, 0, 0, Math.PI * 2, false);
            ctx6.fillStyle = mouseColor;
            ctx6.fill();
        }
    }
}

function init(){
    eyesArray = [];
let overlapping = false;
let protection = 20000;
let counter = 0;

    while (eyesArray.length < numberOfEyes && counter < protection){
        let radius = Math.floor(Math.random() * (eyeMaxD - eyeMinD) + eyeMinD);
        let eye = {
            r: radius,
            x: Math.random() * (canvas6.width - 2 * radius * 1.2) + radius * 1.2,
            y: Math.random() * (canvas6.height - 2 * radius) + radius
        }
        overlapping = false;
        for(let ii = 0; ii < eyesArray.length; ii++) {
            let previous = eyesArray[ii];
            let dx = eye.x - previous.x;
            let dy = eye.y - previous.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < eye.r + previous.r){
                overlapping = true;
                break;
            }
        }
        if (!overlapping){
            eyesArray.push(new Eye(eye.x, eye.y, eye.r));
        }
        counter++;
    }

}

function animate(){
    requestAnimationFrame(animate);

    ctx6.clearRect(0, 0, canvas6.width, canvas6.height);

    for(let ii = 0; ii < eyesArray.length; ii++){
        eyesArray[ii].draw();
    }
}

init();
animate();












