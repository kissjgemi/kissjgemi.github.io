
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

const canvas35 = document.getElementById('canvas35');
var ctx35 = canvas35.getContext('2d');

canvas35.width = window.innerWidth;
canvas35.height = window.innerHeight;
ctx35.globalCompositeOperation = gCompositeOp[0];

window.addEventListener('resize', function(){
    canvas35.width = window.innerWidth;
    canvas35.height = window.innerHeight;
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

class Button{
    constructor(x,y,width,height,baseX) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.baseX = x;
    }

    draw(){
        ctx35.fillStyle = 'blue';
        ctx35.beginPath();
        ctx35.fillRect(this.x,this.y,this.width,this.height);
        ctx35.closePath();
    }

    update(){
        let directionX = 2.2;
        if ((mouse.x < this.x +this.width &&
             mouse.x > this.x &&
             mouse.y < this.y + this.height &&
             mouse.y > this.y ) && 
             (this.x > this.baseX - 50)){
            this.x -= directionX;
            //this.width += directionX;
        }else if(this.x < this.baseX){
            this.x +=directionX;
            //this.width -= directionX;
        }
    }
}

const buttons = [];

function createButtons(){
    for (let ii=0; ii < 5; ii++){
        let topMargin = 80;
        let buttonMargin = 5;
        let x = 142;
        let y = topMargin + ((50 + buttonMargin) * ii);
        let width = 200;
        let height = 50;
        buttons.push(new Button(x,y,width,height));
    }
}

createButtons();

function drawButtons(){
    for (let ii=0; ii < buttons.length; ii++){
        buttons[ii].update();
        //buttons[ii].draw();
    }
}

const particleArray = [];
const numberOfParticles = 80;

class Particle {
    constructor(x,y,size,weight){
        this.x = x;
        this.y = y;
        this.size = size;
        this.weight = weight;
        this.flowRight = false;
    }
    update(){
        if(this.x > mouse.x - 50 &&
           this.x < mouse.x + 50 &&
           this.y > mouse.y -5 &&
           this.y < mouse.y +5){
               this.x -= this.weight;
               this.y += this.weight;
               this.flowRight = true;
           }
        for(let ii=0; ii<buttons.length; ii++){
            if (this.x < buttons[ii].x + buttons[ii].width &&
                this.x > buttons[ii].x &&
                this.y < buttons[ii].y + buttons[ii].height &&
                this.y > buttons[ii].y) {
                    this.weight = 0;
                    if(this.flowRight){
                        this.x += 4;
                    }else{
                        this.x -= 4;
                    }
                }else{
                    this.weight += 0.03;
                }
        }
        if (this.y > canvas35.height){
            this.y = 0 - this.size;
            this.x = Math.random() * 60 + 200;
            this.weight = Math.random() * 1.5 + 1;
            this.flowRight = false;
        }
        this.y += this.weight;
    }

    draw(){
        ctx35.fillStyle = 'rgba(128,192,224,1)';
        ctx35.beginPath();
        ctx35.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx35.fill();
    }
}

function createParticles(){
    for (let ii=0; ii<numberOfParticles; ii++){
        const x = Math.random()*60 + 200;
        const y = Math.random()*canvas35.height;
        const size = Math.random()*20 + 5;
        const weight = Math.random()*1.5 + 1;
        particleArray.push(new Particle(x,y,size,weight));
    }
}

createParticles();

function animate(){
    requestAnimationFrame(animate);
    ctx35.clearRect(0,0,canvas35.width,canvas35.height);
    for (let ii= 0; ii<particleArray.length; ii++){
        particleArray[ii].update();
        particleArray[ii].draw();
    }
    drawButtons();
}

animate();

