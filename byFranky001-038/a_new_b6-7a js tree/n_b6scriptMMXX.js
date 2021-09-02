
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


let minLength = 15;
let d_angleLeft = 5;
let l_multiLeft = 0.8;
let d_angleRight = 10;
let l_multiRight = 0.75;

let startX = canvas7.width / 2;
let startY = canvas7.height - 1;
let length = canvas7.height / 5;
let angle = 0;
let width = 2;
let strokeColor = "black";
let fillColor = "green";


function drawTree(startX, startY, length, angle, width, strokeColor, fillColor){
    ctx7.save();

    ctx7.beginPath();
    ctx7.strokeStyle = strokeColor;
    ctx7.fillStyle = fillColor;
    ctx7.lineWidth = width;
    ctx7.translate(startX, startY);
    ctx7.rotate(angle * Math.PI / 180);
    ctx7.moveTo(0, 0);
    ctx7.lineTo(0, -length);
    ctx7.fill();
    ctx7.stroke();

    if (length < minLength){
        ctx7.restore();
        return;
    }

    drawTree(0, -length, length * l_multiLeft, angle - d_angleLeft, width, strokeColor, fillColor);
    drawTree(0, -length, length * l_multiRight, angle + d_angleRight, width, strokeColor, fillColor);

    ctx7.restore();
}

drawTree(startX, startY, length, angle, width, strokeColor, fillColor);











