
const canvas46 = document.getElementById('canvas46');
const ctx46 = canvas46.getContext('2d');

canvas46.width = window.innerWidth;
canvas46.height = window.innerHeight;                       

window.addEventListener('resize', function(){
    canvas46.width = window.innerWidth;
    canvas46.height = window.innerHeight;
    animate();
});

const mouse = {
    x: canvas46.width/2,
    y: canvas46.height/2,
    radius: 60,
    angle: 0
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log("[ " + mouse.x + " : " + mouse.y + " ]");
});

canvas46.addEventListener('mouseleave', function(event){
    console.log('mouseleave');
    mouse.x = event.x;
    mouse.y = event.y;
    showMouse = false;
});

canvas46.addEventListener('mouseenter', function(event){
    console.log('mouseenter');
    mouse.x = event.x;
    mouse.y = event.y;
    showMouse = true;
});

let showMouse = false;

let numberOfParticles = canvas46.width*canvas46.height/6000;
let particles = [];
let dimmColor = "rgba(255,255,255,0.01)";
let strokeColor = "rgba(0,0,0,0.95)";
let hue = 0;

ctx46.baseLine = 'middle';

let letters = ['E','U','R','O','G','Y','M','2','4','e','u','r','o','g','y','m'];
let letterNr = 0;

const gradient = ctx46.createLinearGradient(0,0,canvas46.width,0);
gradient.addColorStop('0.2','red');
gradient.addColorStop('0.4','blue');
gradient.addColorStop('0.6','yellow');
gradient.addColorStop('0.8','pink');

const gradient2 = ctx46.createLinearGradient(0,0,canvas46.width,0);
gradient.addColorStop('0.2','black');
gradient.addColorStop('0.5','red');
gradient.addColorStop('0.8','white');

class Particle {
    constructor(x,y,r){
        this.r = r;
        this.x = x;
        this.y = y;
        this.color = 'hsl(' + hue + ',100%,50%)';
        this.txt = letters[letterNr];
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        letterNr++;
        if(letterNr >= letters.length){
            letterNr = 0;
        }
    }

    draw(){
        ctx46.beginPath();
        ctx46.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx46.fillStyle = this.color;
        // ctx46.fillStyle = gradient;
        ctx46.fill();

        ctx46.beginPath();
        ctx46.arc(this.x,this.y,this.r*0.8,0,1.6*Math.PI,true);
        ctx46.fillStyle = 'white';
        ctx46.fill();

        //ctx46.strokeStyle = gradient2;
        ctx46.font = this.r + 'px Verdana';
        let m = ctx46.measureText(this.txt);
        ctx46.fillText(this.txt,this.x - m.width/2,this.y + 0.5*this.r);
    }
    auto(){
        if(!showMouse){
            mouse.x = mouse.radius*canvas46.width/150*Math.sin(mouse.angle*Math.PI/180) + canvas46.width/2;
            mouse.y = mouse.radius*canvas46.height/150*Math.cos(mouse.angle*Math.PI/240) + canvas46.height/2;
        }
        mouse.angle += 0.02;
    }
}

function addParticle(){
    let overlap = true;
    let protection = 500;
    let counter = 0;

    while (counter < protection && overlap){
        counter++;
        let randomAngle = Math.random()*2*Math.PI;
        let randomRadius = mouse.radius*Math.random();
        let particle = {
            x: mouse.x + randomRadius*Math.cos(randomAngle),
            y: mouse.y + randomRadius*Math.sin(randomAngle),
            r: Math.floor(Math.random()*(mouse.radius - 10) + 10)
        }
        overlap = false;
        for(let ii=0; ii<particles.length; ii++){
            let dx = particle.x - particles[ii].x;
            let dy = particle.y - particles[ii].y;
            let d = Math.sqrt(dx*dx + dy*dy);
            if (d < particle.r + particles[ii].r){
                overlap = true;
                break;
            }
        }
        if(!overlap){
            particles.unshift(new Particle(
                particle.x, particle.y, particle.r));
        }
    }
    console.log(particles.length);
}

function animate(){

    //ctx46.fillStyle = dimmColor;
    //ctx46.fillRect(0,0,innerWidth,innerHeight);
    ctx46.clearRect(0,0,canvas46.width,canvas46.height);

    for(let ii=0; ii<particles.length; ii++){
        particles[ii].draw();
        particles[ii].auto();
    }
    if(particles.length >= numberOfParticles){
        particles.pop();
    }
    addParticle();
    hue++;
    requestAnimationFrame(animate);
}

animate();

