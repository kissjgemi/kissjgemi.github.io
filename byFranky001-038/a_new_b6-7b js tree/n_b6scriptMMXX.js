
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

const canvas7 = document.getElementById('canvas7');
var ctx7 = canvas7.getContext('2d');

canvas7.width = window.innerWidth;
canvas7.height = window.innerHeight;
ctx7.globalCompositeOperation = gCompositeOp[0];

window.addEventListener('resize', function(){
    canvas7.width = window.innerWidth;
    canvas7.height = window.innerHeight;
});

let showMouse = false;

const mouse = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log("[ " + mouse.x + " : " + mouse.y + " ]");
});

canvas7.addEventListener('mouseleave', function(event){
    console.log('mouseleave');
    mouse.x = event.x;
    mouse.y = event.y;
    showMouse = false;
});

canvas7.addEventListener('mouseenter', function(event){
    console.log('mouseenter');
    mouse.x = event.x;
    mouse.y = event.y;
    showMouse = true;
});


let maxAngle = 20;
let minAngle = 15;

let leafLength = 15;
let minLength = 10;

let d_angleLeft = Math.floor(Math.random() * (maxAngle - minAngle)) + minAngle;
let d_angleRight = Math.floor(Math.random() * (maxAngle - minAngle)) + minAngle;

let l_multiLeft = 0.8;
let l_multiRight = 0.8;

let w_multiLeft = 0.8;
let w_multiRight = 0.7;

let startX = canvas7.width / 2;
let startY = canvas7.height - 1;
let length = canvas7.height / 5;
let angle = 0;
let width = 40;
let strokeColor = "brown";
let fillColor = "green";

function drawLeaf(x, y, l){
    let nrOfLeafs = minLength;
    for (let ii = 0; ii < nrOfLeafs; ii++){
        let r1 = leafLength / minLength;
        let r2 = 2 * leafLength / minLength / 3;
        let angle = Math.random() * Math.PI;
        let dx = Math.random() * minLength * 2 - minLength;
        let dy = Math.random() * l;
        ctx7.beginPath();
        ctx7.ellipse( x + dx, y + dy, r1, r2, angle, 0, Math.PI * 2, false);
        ctx7.fill();        
        ctx7.closePath();
    }
}

var old_width = width * 1.333;

function drawTree(startX, startY, length, angle, width, strokeColor, fillColor){
    ctx7.save();

    ctx7.strokeStyle = strokeColor;
    ctx7.fillStyle = fillColor;
    ctx7.lineWidth = old_width / 1.6;
    ctx7.translate(startX, startY);
    ctx7.rotate(angle * Math.PI / 180);

    if (length > leafLength){
        ctx7.beginPath();
        ctx7.moveTo(old_width / 3, 0);
        ctx7.lineTo(width / 4, -length);
        ctx7.lineTo(-width / 4, -length);
        ctx7.lineTo(-old_width / 3, 0);
        ctx7.closePath();
        ctx7.stroke();
    }

    drawLeaf(0, -length / 2, length);

    if (length < minLength){
        ctx7.restore();
        return;
    }


    old_width = width;
    
    drawTree(0, -length, length * l_multiLeft, angle - d_angleLeft, width * w_multiLeft);

    old_width = width;

    drawTree(0, -length, length * l_multiRight, angle + d_angleRight, width * w_multiRight);

    ctx7.restore();
}

drawTree(startX, startY, length, angle, width, strokeColor, fillColor);











