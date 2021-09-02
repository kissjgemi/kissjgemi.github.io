

const canvas44 = document.getElementById('canvas44');
const ctx44 = canvas44.getContext('2d');

function initCanvas(){
    canvas44.width = 600;
    canvas44.height = 400;
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

let gradient = ctx44.createLinearGradient(0,0,0,70);
gradient.addColorStop('0.3','red');
gradient.addColorStop('0.4','white');
gradient.addColorStop('0.5','blue');
gradient.addColorStop('0.6','white');
gradient.addColorStop('0.7','red');

function drawScore(){
    ctx44.fillStyle = gradient;
    ctx44.font = '90px Georgia';
    let text = score;
    let m = ctx44.measureText(text);
    ctx44.strokeText(score, canvas44.width - m.width - 10, 70);
    ctx44.fillText(score, canvas44.width - m.width - 10, 70);
}

function animate(){                      
    ctx44.clearRect(0,0,canvas44.width,canvas44.height);
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
    }
});

function gameOver(){
    ctx44.fillStyle = 'black';
    ctx44.font = '25px Georgia';
    let text = 'Game Over, your score is ' + score;
    let m = ctx44.measureText(text);
    ctx44.fillText(text, (canvas44.width - m.width)/2, 
                         (canvas44.height - 25)/2 );
}

function handleCollosions(){
    for(let ii=0; ii<obstaclesArray.length; ii++){
        if(bird.x < obstaclesArray[ii].x + obstaclesArray[ii].width &&
           bird.x + bird.width > obstaclesArray[ii].x){
            if(bird.y < 0+obstaclesArray[ii].top ||
                  bird.y > canvas44.height - obstaclesArray[ii].bottom){
                     ctx44.drawImage(bang, bird.x, bird.y, 50, 50);
                     gameOver();
                     return true; 
                  }
           }
    }
}
