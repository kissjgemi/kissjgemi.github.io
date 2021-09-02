
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

const canvas34 = document.getElementById('canvas34');
var ctx34 = canvas34.getContext('2d');

canvas34  .width = window.innerWidth;
canvas34  .height = window.innerHeight;
ctx34.globalCompositeOperation = gCompositeOp[0];

window.addEventListener('resize', function(){
    canvas34  .width = window.innerWidth;
    canvas34  .height = window.innerHeight;
    init();
});

const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log("[ " + mouse.x + " : " + mouse.y + " ]");
});

window.addEventListener('mouseout', function(){
    mouse.x = undefined;
    mouse.y = undefined;
});

window.addEventListener('mousedown', function(event){
    
});

const maxLevel = 5;
const branches = 2;
const sizes = Math.floor(Math.random() * 7 + 3);

const width = Math.floor(Math.random() * 6 + 2);

const length = Math.floor(Math.random() * 100 + 100);

ctx34.translate(canvas34.width / 2, canvas34.height / 2);

const angle = Math.PI *2 * (Math.random() * 0.48 + 0.51);

const start = Math.floor(Math.random()*2);

function drawLine(level){
    if (level > maxLevel) return;

    ctx34.strokeStyle = "white";
    ctx34.lineWidth = width;
    ctx34.beginPath();
    ctx34.moveTo(0,0);
    ctx34.lineTo(length,0);
    ctx34.stroke();

    for (let ii=start; ii<branches; ii++){
        ctx34.save();
        ctx34.translate(length * ii / (branches + 1), 0);
        ctx34.scale(0.5, 0.5);
        ctx34.save();

        ctx34.rotate(angle);
        drawLine(level + 1);
        ctx34.restore();
        ctx34.save();

        ctx34.rotate(-angle);
        drawLine(level + 1);
        ctx34.restore();

        ctx34.restore();
    }
}

for (let ii=0; ii<sizes; ii++){
    drawLine(0);
    ctx34.rotate(Math.PI * 2 / sizes);
}
