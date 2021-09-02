const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 0.9 * window.innerWidth;
canvas.height = 0.9 * window.innerHeight;

window.addEventListener('resize', function() {
    canvas.width = 0.9 * window.innerWidth;
    canvas.height = 0.9 * window.innerHeight;
    player = new Player();
    mouse.x = canvas.width / 2;
    mouse.y = canvas.height / 2;
});

let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}

let score = 0;
let gameFrame = 0;
let bubbleRadius = 50;
ctx.font = '50px Georgia';

let canvasPosition = canvas.getBoundingClientRect();

canvas.addEventListener('mousemove', function(event) {

});

canvas.addEventListener('mouseout', function() {

});

canvas.addEventListener('mousedown', function(event) {
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
    mouse.click = true;
});

canvas.addEventListener('mouseup', function(event) {
    mouse.click = false;
});

const playerLeft = new Image();
playerLeft.src = 'cartoon_fish_swim_left.png';
const playerRight = new Image();
playerRight.src = 'cartoon_fish_swim_right.png';

class Player {
    constructor(){
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.radius = bubbleRadius;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 1672 / 4;
        this.spriteHeight = 1191 / 3;
        this.speed = 20;
    }
    
    update(){
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        
        const dxy = Math.sqrt(dx * dx + dy * dy);

        this.angle = Math.atan2(dy, dx);
        
        let dd = 0;
        if(dxy > this.speed){
            dd = this.speed / dxy;
            this.x -= dx * dd;
            this.y -= dy * dd;
        } else {
            this.x < mouse.x ? mouse.x - 1 : mouse.x + 1;
            this.y = mouse.y;
        }
    }

    draw(){
        if(mouse.click){
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.strokeStyle = 'yellow';
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
        //ctx.fillStyle = 'red';
        //ctx.beginPath();
        //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        //ctx.fill();
        //ctx.closePath();

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        if(this.x < mouse.x){
        ctx.drawImage(playerRight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, -50, -50, this.radius * 2, this.radius * 2);
        } 
        if(this.x >= mouse.x) {
        ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, -50, -50, this.radius * 2, this.radius * 2);
        }

        ctx.restore();
    }
}

let player = new Player();

const bubblesArray = [];
const bubblePop1 = document.createElement('audio');
bubblePop1.src = 'pop3.ogg';
bubblePop1.autoplay = false;

const bubblePop2 = document.createElement('audio');
bubblePop2.src = 'bubbles-single1.wav';
bubblePop2.autoplay = false;

class Bubble {
    constructor(){
        this.x = Math.random() * (canvas.width - 2 * bubbleRadius) + bubbleRadius;
        this.y = canvas.height + 2 * bubbleRadius;
        this.radius = 50;
        this.speed = Math.random() * 4 + 2;
        this.distance = 0;
        this.sound = Math.random() < 0.5 ? 'sound1' : 'sound2';
    }

    update(){
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }

    draw(){
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
}

function handleBubbles(){
    if (gameFrame % 50 == 0){
        bubblesArray.push(new Bubble());
    }
    for(let i = 0; i < bubblesArray.length; i++){
        bubblesArray[i].update();
        bubblesArray[i].draw();
        if(bubblesArray[i].y < -bubblesArray[i].radius){
            bubblesArray.splice(i, 1);
        }
        let limit = bubblesArray[i].radius + player.radius;
        if(bubblesArray[i]){
            if(bubblesArray[i].distance < limit){
                switch(bubblesArray[i].sound){
                    case 'sound1':
                            bubblePop1.play();
                            break;
                    case 'sound2':
                            bubblePop2.play();
                            break;
                    default:
                }
                bubblesArray.splice(i, 1);
                score++;
            }
        }
    }
    for(let i = 0; i < bubblesArray.length; i++){

    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBubbles();

    player.update();
    player.draw();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillText('score: ' + score, 10, 50);
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();

