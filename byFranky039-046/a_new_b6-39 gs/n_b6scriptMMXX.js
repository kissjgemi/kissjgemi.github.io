
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

const canvas39 = document.getElementById('canvas39');
const ctx39 = canvas39.getContext('2d');

canvas39.width = window.innerWidth;
canvas39.height = window.innerHeight;
ctx39.globalCompositeOperation = gCompositeOp[0];

window.addEventListener('resize', function(){
    canvas39.width = window.innerWidth;
    canvas39.height = window.innerHeight;
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

const images = [];
images.player = new Image();
images.player.src = 'characters/CupheadOverworld.png';
const characterActions = [  'up',
                            'top right',
                            'right',
                            'down right',
                            'down',
                            'jump'];

const playerWidth = 103.0625;
const playerHeight = 113.125;

let playerFrameX = 3;

class Character{
    constructor(){
        this.width = playerWidth;
        this.height = playerHeight;
        this.frameX = playerFrameX;
        this.x = Math.random()*canvas39.width - this.width;
        this.y = Math.random()*canvas39.height - this.height;
        this.speed = Math.random()*3.5+1.5;
        this.action = characterActions[Math.floor(Math.random()*characterActions.length)];
        switch (this.action){
            case 'up':
                this.frameY = 0;
                this.minFrame = 4;
                this.maxFrame = 15;
                break;
            case 'top right':
                this.frameY = 1;
                this.minFrame = 3;
                this.maxFrame = 14;
                break;
            case 'right':
                this.frameY = 3;
                this.minFrame = 3;
                this.maxFrame = 13;
                break;
            case 'down right':
                this.frameY = 4;
                this.minFrame = 4;
                this.maxFrame = 15;
                break;
            case 'down':
                this.frameY = 6;
                this.minFrame = 0;
                this.maxFrame = 12;
                break;
            case 'jump':
                this.frameY = 7;
                this.minFrame = 0;
                this.maxFrame = 9;
                break;
            default:

        }
        console.log(this.action);
    }
    draw(){
        drawSprite(images.player,
            this.width*this.frameX,
            this.height*this.frameY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height);
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        }else{
            this.frameX = this.minFrame;
        };
    }
    update(){
        switch (this.action){
            case 'up':
                if(this.y < 0 - this.height){
                    this.y = canvas39.height - this.height;
                    this.x = Math.random()*canvas39.width - this.width; 
                }else{
                    this.y -= this.speed;
                }
               break;
            case 'top right':
                if( this.y > 0 - this.height &&
                    this.x < canvas39.width + this.width){
                    this.x += this.speed;
                    this.y -= this.speed;
                }else{
                    this.y = canvas39.height + this.height;
                    this.x = Math.random()*canvas39.width - this.width;
                }
                break;
            case 'right':
                if(this.x < canvas39.width + this.width){
                    this.x += this.speed;
                }else{
                    this.x = 0 - this.width;
                    this.y = Math.random()*canvas39.height - this.height;
                }
                break;
            case 'down right':
                if( this.x < (canvas39.width + this.width) &&
                    this.y < (canvas39.height + this.height)){
                    this.x += this.speed;
                    this.y += this.speed;
                }else{
                    this.y = 0 - this.height;
                    this.x = Math.random()*canvas39.width - this.width;
                }
                break;
            case 'down':
                if(this.y > canvas39.height + this.height){
                    this.y = 0 - this.height;
                    this.x = Math.random()*canvas39.width - this.width; 
                }else{
                    this.y += this.speed;
                }
                break;
            case 'jump':
                break;
            default:

        }
    }
}

const characters = [];
const numberOfCharacters = 10;

for(let ii=0; ii<numberOfCharacters; ii++){
    characters.push(new Character());
}

function drawSprite(img,sX,sY,sW,sH,dX,dY,dW,dH){
    ctx39.drawImage(img,sX,sY,sW,sH,dX,dY,dW,dH);
}

function animate(){
    ctx39.clearRect(0,0,canvas39.width,canvas39.height);
    for(let ii=0; ii<characters.length; ii++){
        characters[ii].draw();
        characters[ii].update();
    }
}

window.onload = setInterval(animate, 1000/30);
