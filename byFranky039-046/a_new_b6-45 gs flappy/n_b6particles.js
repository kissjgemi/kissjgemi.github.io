const particlesArray = [];

class Particle {
    constructor(){
        this.x = bird.x;
        this.y = bird.y;
        this.size = Math.random()*7 + 3;
        this.speedY = Math.random()*1 - 0.5;
        this.color = 'hsla(' + hue + ',100%,50%,0.65)'; 
    }

    update(){
        this.x -= gamespeed;
        this.y += this.speedY;
    }

    draw(){
        ctx45.fillStyle = this.color;
        ctx45.beginPath();
        ctx45.arc(this.x,this.y,this.size,0,2*Math.PI);
        ctx45.fill();
    }
}

function handleParticles(){
    particlesArray.unshift(new Particle());
    for(let ii=0; ii<particlesArray.length; ii++){
        particlesArray[ii].update();
        particlesArray[ii].draw();
    }

    if(particlesArray.length > 200){
        for(let ii=0; ii<20; ii++){
            particlesArray.pop(particlesArray[ii]);
        }
    }
}