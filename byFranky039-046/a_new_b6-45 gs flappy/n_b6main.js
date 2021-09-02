

const canvas45 = document.getElementById('canvas45');
const ctx45 = canvas45.getContext('2d');

function initCanvas(){
    canvas45.width = 600;
    canvas45.height = 400;
}

initCanvas();

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;

let flapdelta = 2;

const bang = new Image();
bang.src = 'bang.png';

const background = new Image();
background.src = 'bg/BG.png';
const BG = {
    x1: 0,
    x2: canvas45.width,
    y: 0,
    width: canvas45.width,
    height: canvas45.height
}

function handleBackground(){
    if(BG.x1 <= -BG.width + gamespeed/2){
        BG.x1 = BG.width;
    }else{
        BG.x1 -= gamespeed/2;
    }
    if(BG.x2 <= -BG.width + gamespeed/2){
        BG.x2 = BG.width;
    }else{
        BG.x2 -= gamespeed/2;
    }
    ctx45.drawImage(background,BG.x1,BG.y,BG.width,BG.height);
    ctx45.drawImage(background,BG.x2,BG.y,BG.width,BG.height);
}

let gradient = ctx45.createLinearGradient(0,0,0,70);
gradient.addColorStop('0.3','red');
gradient.addColorStop('0.4','white');
gradient.addColorStop('0.5','blue');
gradient.addColorStop('0.6','white');
gradient.addColorStop('0.7','red');

function drawScore(){
    ctx45.fillStyle = gradient;
    ctx45.font = '90px Georgia';
    let text = score;
    let m = ctx45.measureText(text);
    ctx45.strokeText(score, canvas45.width - m.width - 10, 70);
    ctx45.fillText(score, canvas45.width - m.width - 10, 70);
}

function animate(){                      
    ctx45.clearRect(0,0,canvas45.width,canvas45.height);
    handleBackground();
    handleObstacles();
    bird.update();
    bird.draw();
    drawScore();
    if(handleCollosions()) return;
    handleParticles();
    angle++;
    hue++;
    frame++;
    requestAnimationFrame(animate); 
}

animate();

window.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        spacePressed = true;
    }
});

window.addEventListener('keyup', function(e){
    if(e.code === 'Space'){
        spacePressed = false;
        bird.frameX = 0;
    }
});

function gameOver(){
    ctx45.fillStyle = 'black';
    ctx45.font = '25px Georgia';
    let text = 'Game Over, your score is ' + score;
    let m = ctx45.measureText(text);
    ctx45.fillText(text, (canvas45.width - m.width)/2, 
                         (canvas45.height - 25)/2 );
}

function handleCollosions(){
    for(let ii=0; ii<obstaclesArray.length; ii++){
        if(bird.x < obstaclesArray[ii].x + obstaclesArray[ii].width &&
           bird.x + bird.width > obstaclesArray[ii].x){
            if(bird.y < 0+obstaclesArray[ii].top ||
               bird.y + bird.height > canvas45.height - obstaclesArray[ii].bottom){
                     ctx45.drawImage(bang, bird.x, bird.y, 50, 50);
                     gameOver();
                     return true; 
                  }
           }
    }
}
