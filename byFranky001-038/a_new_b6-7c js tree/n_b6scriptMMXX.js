
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
ctx7.globalCompositeOperation = gCompositeOp[4];

window.addEventListener('resize', function(){
    canvas7.width = window.innerWidth;
    canvas7.height = window.innerHeight;
    startX = canvas7.width / 2;
    startY = canvas7.height - 1;
    tree(startX);
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


window.addEventListener('mousedown', function(event){
    if (event.button == 1){
        startX = event.x;
        startY = event.y;
        if (startY < canvas7.height/2){
            startY = canvas7.height/2;
        }
        tree(startX);
    }
    if (event.button == 0){
        ctx7.clearRect(0, 0, canvas7.width, canvas7.height);
        startX = canvas7.width / 2;
        startY = canvas7.height - 1;
        tree(startX);
    }

});

let leafR = 5;

let leafLength;
let minLength;

let besierLeft;
let besierRight;


let d_angleLeft = 5;
let d_angleRight = 10;

let l_multiLeft = Math.random() * 0.15 + 0.65;
let l_multiRight = Math.random() * 0.15 + 0.65;

let w_multiLeft = Math.random() * 0.2 + 0.5;
let w_multiRight = Math.random() * 0.2 + 0.5;

let startX = canvas7.width / 2;
let startY = canvas7.height - 1;
let angle;

let length;
var old_width;


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

function drawTree(startX, startY, length, angle, width, strokeColor, fillColor){
    ctx7.save();

    ctx7.strokeStyle = strokeColor;
    ctx7.fillStyle = fillColor;
    ctx7.shadowColor = shadowColor;
    ctx7.shadowBlur = shadowBlur;
    ctx7.lineWidth = old_width / 1.2;
    ctx7.translate(startX, startY);
    ctx7.rotate(angle * Math.PI / 180);

    besierLeft = Math.random() * 10 + 10;
    besierRight = - (Math.random() * 10 + 10);

    if (length > leafLength){
        ctx7.beginPath();
        let delta = (old_width - width) / 2.4;

        if (angle >= 0){
            ctx7.moveTo(old_width / 2, delta);
            ctx7.bezierCurveTo(-besierLeft, -length/2, besierLeft, -length/2, -delta + width / 2, -length);
            ctx7.moveTo(-old_width / 2, 0);
            ctx7.bezierCurveTo(-besierLeft, -length/2, besierLeft, -length/2, delta - width / 2, -length);
        } else {
            ctx7.moveTo(old_width / 2, 0);
            ctx7.bezierCurveTo(-besierRight, -length/2, besierRight, -length/2, -delta + width / 2, -length);
            ctx7.moveTo(-old_width / 2, delta);
            ctx7.bezierCurveTo(-besierRight, -length/2, besierRight, -length/2, delta - width / 2, -length);
        }
        ctx7.stroke();
    }

    drawLeaf(0, -length / 2, length);

    if ( length < minLength){
        ctx7.restore();
        return;
    }

    d_angleLeft = Math.random() * 10 + 8;
    d_angleRight = Math.random() * 5 + 10;

    old_width = width;
    drawTree(0, -length, length * l_multiLeft, angle - d_angleLeft, width * w_multiLeft);
    old_width = width;
    drawTree(0, -length, length * l_multiRight, angle + d_angleRight, width * w_multiRight);

    ctx7.restore();
}

var shadowColor;
var shadowBlur;

function tree(x){
    length = Math.random() * 30 + startY / 4 - 30;
    let width = length / 10;
    leafLength = width * 1.5;
    if (leafLength > 12){
        minLength = leafLength - 6;
    } else {
        minLength = 1;
    }
    old_width = Math.random() * 0.60 + width * 1.333;

    let red = Math.floor(256 * (Math.random()));
    let green = Math.floor(256 * (Math.random()));
    let blue = Math.floor(256 * (Math.random()));

    let strokeColor = "rgb( 160, " + green/2 + ", " + green/2 + " )";
    let fillColor = "rgb( " + red/2 + ", 224, " + blue/2 +" )";
    shadowColor = strokeColor;
    shadowBlur = Math.random() * 10 + 10;

    angle = Math.random() - 0.5;

    drawTree(x, startY, length, angle, width, strokeColor, fillColor);
}

tree(startX);






