
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

const canvas43 = document.getElementById('canvas43');
const ctx43 = canvas43.getContext('2d');

canvas43.width = window.innerWidth;
canvas43.height = window.innerHeight;
ctx43.globalCompositeOperation = gCompositeOp[0];
                       

window.addEventListener('resize', function(){
    canvas43.width = window.innerWidth;
    canvas43.height = window.innerHeight;
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

});

window.addEventListener('mousedown', function(event){
    
});

let numberOfParticles = 200;
let particlesArray = [];
let dimmColor = "rgba(255,255,255,0.01)";
let strokeColor = "rgba(0,0,0,0.95)";
let hue = 0;

const gradient = ctx43.createLinearGradient(0,0,canvas43.width,0);
gradient.addColorStop('0.2','red');
gradient.addColorStop('0.4','blue');
gradient.addColorStop('0.6','yellow');
gradient.addColorStop('0.8','pink');

const gradient2 = ctx43.createLinearGradient(0,0,canvas43.width,0);
gradient.addColorStop('0.2','black');
gradient.addColorStop('0.5','red');
gradient.addColorStop('0.8','white');

class Particle {
    constructor(){
        this.r = Math.random() * 10 + 2;
        this.x = Math.random() * (canvas43.width - this.r * 2) + this.r;
        this.y = Math.random() * (canvas43.height - this.r * 2) + this.r;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    draw(){
        ctx43.beginPath();
        ctx43.arc(this.x,this.y,this.r,0,2*Math.PI);
        // ctx43.fillStyle = "hsl(" + hue + ", 100%, 50%)";
        ctx43.fillStyle = gradient;
        ctx43.fill();
        //ctx43.strokeStyle = strokeColor;
        ctx43.strokeStyle = gradient2;
        ctx43.stroke();
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.x + this.r > canvas43.width ||
            this.x - this.r < 0){
                this.speedX *= -1;
            }
        if(this.y + this.r > canvas43.height ||
            this.y - this.r < 0){
                this.speedY *= -1;
            }
        this.draw();
        }
}

function init(){
    particlesArray = [];
    for(let ii=0; ii<numberOfParticles; ii++){
        particlesArray.push(new Particle());
    }
}

function animate(){

    //ctx43.fillStyle = dimmColor;
    //ctx43.fillRect(0,0,innerWidth,innerHeight);
    ctx43.clearRect(0,0,innerWidth,innerHeight);

    for(let ii=0; ii<particlesArray.length; ii++){
        particlesArray[ii].update();
    }
    //hue++;
    requestAnimationFrame(animate);
}

init();
animate();

