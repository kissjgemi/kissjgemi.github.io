class Frogger {
    constructor() {
        this.spriteWidth = 250;
        this.spriteHeight = 250;
        this.width = this.spriteWidth / 5;
        this.height = this.spriteHeight / 5;
        this.x = canvas3.width / 2 - this.width / 2;
        this.y = canvas3.height - this.height - 40;
        this.frameX = 0;
        this.frameY = 0;
        this.moving = false;
    }


    update() {
        if (keys[38]) {
            if (this.y > 0 && !this.moving) {
                this.y -= grid;
                this.moving = true;
                this.framex = 1;
                this.frameY = 0;
            }
        }
        if (keys[40]) {
            if (this.y < canvas3.height - this.height * 2 && !this.moving) {
                this.y += grid;
                this.moving = true;
                this.framex = 1;
                this.frameY = 3;
            }
        }
        if (keys[37]) {
            if (this.x > this.width && !this.moving) {
                this.x -= grid;
                this.moving = true;
                this.framex = 1;
                this.frameY = 2;
            }
        }
        if (keys[39]) {
            if (this.x < canvas3.width - this.width * 2 && !this.moving) {
                this.x += grid;
                this.moving = true;
                this.framex = 1;
                this.frameY = 1;
            }
        }
        if (this.y < 0) {
            scored();
        }
    }

    draw() {
        ctx3.fillStyle = 'black';
        ctx3.fillRect(this.x, this.y, this.width, this.height);
        ctx3.drawImage(frog, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - this.width / 2, this.y - this.height / 2, this.width * 2, this.height * 2);
    }

    jump() {
        if (!this.moving) {
            this.frameX = 1;
        } else if (this.frameX === 1) {
            this.frameX = 0;
        }
    }
}

const frogger = new Frogger();