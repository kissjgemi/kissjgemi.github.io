
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

const canvasA = document.getElementById('canvas38a');
var ctxA = canvasA.getContext('2d');

canvasA.width = window.innerWidth;
canvasA.height = window.innerHeight;
ctxA.globalCompositeOperation = gCompositeOp[0];
                       
const canvasB = document.getElementById('canvas38b');
var ctxB = canvasB.getContext('2d');

canvasB.width = window.innerWidth;
canvasB.height = window.innerHeight;
ctxB.globalCompositeOperation = gCompositeOp[0];

window.addEventListener('resize', function(){
    canvasA  .width = window.innerWidth;
    canvasA  .height = window.innerHeight;
    canvasB  .width = window.innerWidth;
    canvasB  .height = window.innerHeight;
    let bubblesA = [];
    let bubblesB = [];
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

});

window.addEventListener('mousedown', function(event){
    
});

let bubblesA = [];
let bubblesB = [];

let colorA = 'rgb(255,255,255';
let speedA = 2.5;
let colorB = 'rgb(255,194,194';
let speedB = 1.8;

function addBubbleA(){
    bubblesA.push(new bubble(colorA, speedA));
}

function addBubbleB(){
    bubblesB.push(new bubble(colorB, speedB));
}

class bubble {
    constructor(color, ySpeed){
        this.radius = Math.random()*150+30;
        this.life = true;
        this.x = Math.random()*window.innerWidth;
        this.y = Math.random()*20 + window.innerHeight; + this.radius;
        this.vy = Math.random()*0.0002+0.0001+ySpeed;
        this.vr = 0;
        this.vx = Math.random()*4-2;
        this.color = color;
    }

    update(){
        this.vy += 0.00001;
        this.vr += 0.02;
        this.y -= this.vy;
        this.x += this.vx;
        if (this.radius > 1){
            this.radius -= this.vr;
        }
        if (this.radius <= 1){
            this.life = false;
        }
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function handleBubbles() {
    for(let ii=bubblesA.length-1; ii >=0; ii--){
        bubblesA[ii].update();
        if(!bubblesA[ii].life){
            bubblesA.splice(ii,1);
        }
    }
    for(let ii=bubblesB.length-1; ii >=0; ii--){
        bubblesB[ii].update();
        if(!bubblesB[ii].life){
            bubblesB.splice(ii,1);
        }
    }
    if(bubblesA.length < (window.innerWidth / 4)){
        addBubbleA();
    }
    if(bubblesB.length < (window.innerWidth / 12)){
        addBubbleB();
    }
}

function animate(){
    ctxA.clearRect(0,0,canvasA.width,canvasA.height);
    ctxB.clearRect(0,0,canvasB.width,canvasB.height);

    handleBubbles();

    for(let ii=bubblesB.length-1; ii >=0; ii--){
        bubblesB[ii].draw(ctxB);
    }
    for(let ii=bubblesA.length-1; ii >=0; ii--){
        bubblesA[ii].draw(ctxA);
    }

    requestAnimationFrame(animate);
}

window.addEventListener('load', animate);
