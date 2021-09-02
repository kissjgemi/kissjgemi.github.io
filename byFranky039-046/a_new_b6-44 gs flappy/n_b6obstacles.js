const obstaclesArray = [];

class Obstacle {
    constructor(){
        this.top = Math.random()*canvas44.height/3 + 20;
        this.bottom = Math.random()*canvas44.height/3 + 20;
        this.x = canvas44.width;
        this.width = 20;
        this.color = 'hsl(' + hue + ',100%,50%)'; 
        this.counted = false;
    }

    draw(){
        ctx44.fillStyle = this.color;
        ctx44.fillRect(this.x,0,this.width,this.top);
        ctx44.fillRect(this.x,canvas44.height - this.bottom,this.width,this.bottom);
    }

    update(){
        this.x -= gamespeed;
        if(!this.counted && this.x < bird.x){
            score++;
            this.counted = true;
        }
        this.draw();
    }
}

function handleObstacles(){
    if (frame%50 === 0){
        obstaclesArray.unshift(new Obstacle());
    }
    
    for(let ii=0; ii<obstaclesArray.length; ii++){
        obstaclesArray[ii].update();
    }

    if(obstaclesArray.length > 20){
        obstaclesArray.pop(particlesArray[0]);
    }
}