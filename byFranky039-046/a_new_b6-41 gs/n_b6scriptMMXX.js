
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

const characterActions = [  'up',
                            'top right',
                            'right',
                            'down right',
                            'top left',
                            'left',
                            'down left',
                            'down',
                            'jump'];



const player = {
    x: 0,
    y: 0,
    width: 40,
    height: 72,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
};

const canvas41 = document.getElementById('canvas41');
const ctx41 = canvas41.getContext('2d');

const playerSprite = new Image();
playerSprite.src = "characters/chewie.png";

const backGround = new Image();
backGround.src = "bg/backgroundSW.png";

var bgWidth, bgHeight;

function initCanvas(){
    canvas41.width = window.innerWidth;
    canvas41.height = window.innerHeight;
    if (canvas41.width/canvas41.height > backGround.width/backGround.height){
        bgHeight = canvas41.width * backGround.height/backGround.width;
        bgWidth = canvas41.width;
    }else{
        bgHeight = canvas41.height;
        bgWidth = canvas41.height * backGround.width/backGround.height;
    }   

    player.x = canvas41.width/2;
    player.y = canvas41.height/2; 

}

ctx41.globalCompositeOperation = gCompositeOp[0];

window.addEventListener('resize', function(){
    initCanvas();
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

const keys = [];

function drawSprite(img,sX,sY,sW,sH,dX,dY,dW,dH){
    ctx41.drawImage(img,sX,sY,sW,sH,dX,dY,dW,dH);
}

window.addEventListener('keydown', function(e){
    keys[e.keyCode] = true;
});

window.addEventListener('keyup', function(e){
    delete keys[e.keyCode];
    player.moving = false;
});

function movePlayer(){
    if(keys[38] && player.y > bgHeight/5){
        player.y -= player.speed;
        player.frameY = 3;
        player.moving = true;
    }
    if(keys[37] && player.x > 0){
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true;
    }
    if(keys[40] && player.y < canvas41.height - player.height){
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
    }
    if(keys[39] && player.x < canvas41.width - player.width){
        player.x += player.speed;
        player.frameY = 2;
        player.moving = true;
    }
    if(player.frameX < 3 && player.moving){
        player.frameX++;
    }else{
        player.frameX = 0;
    }
}

function animating(){
    ctx41.drawImage(backGround,0,0,bgWidth,bgHeight);
    drawSprite( playerSprite,
                player.width * player.frameX,
                player.height * player.frameY,
                player.width, player.height, 
                player.x, player.y, 
                player.width, player.height);
    movePlayer();
}

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps){
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate(){
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval);
        animating();
    }
}

window.addEventListener('load', (event) => {
    console.log("loaded");
    initCanvas();
    startAnimating(10);
});
