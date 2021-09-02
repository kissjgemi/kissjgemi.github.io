
class Bird {
    constructor(){
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.width = 20;
        this.height = 20;
        this.weight = 1;
    }

    update(){
        let curve = 5*Math.sin(angle);
        if(this.y > canvas44.height - this.height*3 + curve){
            this.vy = 0;
            this.y = canvas44.height - this.height*3 + curve;
        }else{
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y += this.vy;
        }
        if(this.y < 0){
            this.vy = 0;
            this.y = 0;
        }
        if(spacePressed && this.y > this.height*3){
            this.flap()
        }
    }

    draw(){
        ctx44.fillStyle = 'hsla(' + hue + ',100%,50%,0.95)';
        ctx44.fillRect(this.x,this.y,this.width,this.height);
    }

    flap(){
        this.vy -= flapdelta;
    }
}

const bird = new Bird();