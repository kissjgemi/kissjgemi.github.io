const dragon = new Image();
dragon.src = 'sp/dragon.png';

class Bird {
    constructor(){
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.originW = 941;
        this.originH = 600;
        this.width = this.originW/20;
        this.height = this.originH/20;
        this.weight = 1;
        this.frameX = 0;
    }

    update(){
        let curve = 5*Math.sin(angle);
        if(this.y > canvas45.height - this.height*3 + curve){
            this.vy = 0;
            this.y = canvas45.height - this.height*3 + curve;
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
            if(this.frameX > 4){
                this.frameX=0;
            }else if(frame%2 === 0){
                this.frameX++;
            }
        }
    }

    draw(){
        //ctx45.fillStyle = 'hsla(' + hue + ',100%,50%,0.95)';
        //ctx45.fillRect(this.x,this.y,this.width,this.height);
        ctx45.drawImage(dragon,this.frameX*this.originW,0,this.originW,this.originH,
                               this.x - 20,this.y - 12,1.7*this.width,1.7*this.height);
    }

    flap(){
        this.vy -= flapdelta;
    }
}

const bird = new Bird();