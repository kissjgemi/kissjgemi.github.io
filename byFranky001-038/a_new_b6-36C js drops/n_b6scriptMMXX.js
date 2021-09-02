
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

const canvas36 = document.getElementById('canvas36');
var ctx36 = canvas36.getContext('2d');

canvas36.width = window.innerWidth;
canvas36.height = window.innerHeight;
ctx36.globalCompositeOperation = gCompositeOp[0];

window.addEventListener('resize', function(){
    canvas36.width = window.innerWidth;
    canvas36.height = window.innerHeight;
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

canvas36.addEventListener('mouseleave', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    showMouse = false;
});

canvas36.addEventListener('mouseenter', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    showMouse = true;
});

let showMouse = false;

setInterval(function(){
    mouse.x = undefined;
    mouse.y = undefined;
}, 600);

const delta = 0.2;
const inc = 1;
let particleArray = [];
const numberOfParticles = 200;

class Particle {
    constructor(x,y,size,color,weight){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }

    draw(){
        ctx36.fillStyle = this.color;
        ctx36.beginPath();
        ctx36.arc(this.x,this.y,this.size,0,Math.PI*2,false);
        ctx36.fill();
    }

    update(){
        this.size -= delta;
        if (this.size < 0){
            this.x = (mouse.x + Math.random()*20-10);
            this.y = (mouse.y + Math.random()*20-10);
            this.size = Math.random()*15+10;
            this.weight = Math.random()*2-0.5;
        }
        this.y += this.weight;
        this.weight += inc;
        if(this.y > canvas36.height - this.size){
            this.weight *= 0.2;
        }
    }
}

function init(){
    particleArray = [];
    for(let ii=0; ii<numberOfParticles; ii++){
        let x = Math.random() * canvas36.width;
        let y = Math.random() * canvas36.height;
        let size =  Math.random() * 15 + 10;
        let color = 'pink';
        let weight = 1;
        particleArray.push(new Particle(x,y,size,color,weight));
    }
}

function animate(){
    ctx36.clearRect(0,0,canvas36.width,canvas36.height);
    //ctx36.fillStyle = 'rgba(0,0,0,0.08)';
    //ctx36.fillRect(0,0,canvas36.width,canvas36.height);
    for(let ii=0; ii<numberOfParticles; ii++){
        particleArray[ii].update();
        particleArray[ii].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();
