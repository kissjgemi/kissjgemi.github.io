class Obstacle {
    constructor(x, y, width, height, speed, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
        this.frameX = 0;
        this.frameY = 0;
        this.randomize = Math.floor(Math.random() * 30 + 30);
        this.carType = Math.floor(Math.random() * numberOfCars);
    }

    draw() {
        ctx2.fillStyle = 'black';
        ctx2.fillRect(this.x, this.y, this.width, this.height);
        if (this.type === 'turtle') {
            if (frame % this.randomize === 0) {
                if (this.frameX >= 1) {
                    this.frameX = 0;
                } else {
                    this.frameX++;
                }
            }
            ctx2.drawImage(turtle, this.frameX * 70, this.frameY * 70, 70, 70, this.x, this.y, this.width, this.height);
        } else if (this.type === 'log') {
            ctx2.drawImage(log, this.x, this.y, this.width, this.height);
        } else {
            ctx2.drawImage(car, this.frameX * this.width, this.carType * this.height, grid * 2, grid, this.x, this.y, this.width, this.height);
        }

    }
    update() {
        this.x += this.speed * gameSpeed;
        if (this.speed > 0) {
            if (this.x > canvas1.width) {
                this.x = 0 - this.width;
                this.carType = Math.floor(Math.random() * numberOfCars);
            }
        } else {
            this.frameX = 1;
            if (this.x < 0 - this.width) {
                this.x = canvas1.width;
                this.carType = Math.floor(Math.random() * numberOfCars);
            }
        }
    }
}

function initObstacles() {
    for (let ii = 0; ii < 2; ii++) {
        let x = ii * 350;
        let y = canvas1.height - grid * 2 - 20;
        let w = 2 * grid + 1;
        let h = grid + 1;
        let s = gameSpeed;
        let t = 'car';
        carsArray.push(new Obstacle(x, y, w, h, s, t));
    }
    for (let ii = 0; ii < 2; ii++) {
        let x = ii * 300;
        let y = canvas1.height - grid * 3 - 20;
        let w = 2 * grid + 1;
        let h = grid + 1;
        let s = -gameSpeed;
        let t = 'car';
        carsArray.push(new Obstacle(x, y, w, h, s, t));
    }
    for (let ii = 0; ii < 2; ii++) {
        let x = ii * 400;
        let y = canvas1.height - grid * 4 - 20;
        let w = 2 * grid + 1;
        let h = grid + 1;
        let s = gameSpeed;
        let t = 'car';
        carsArray.push(new Obstacle(x, y, w, h, s, t));
    }

    for (let ii = 0; ii < 2; ii++) {
        let x = ii * 400;
        let y = canvas1.height - grid * 5 - 20;
        let w = 2 * grid + 1;
        let h = grid + 1;
        let s = -gameSpeed;
        let t = 'log';
        logsArray.push(new Obstacle(x, y, w, h, s, t));
    }

    for (let ii = 0; ii < 3; ii++) {
        let x = ii * 200;
        let y = canvas1.height - grid * 6 - 20;
        let w = grid + 1;
        let h = grid + 1;
        let s = gameSpeed;
        let t = 'turtle';
        logsArray.push(new Obstacle(x, y, w, h, s, t));
    }

}

initObstacles();

function handleObstacles() {
    for (let ii = 0; ii < carsArray.length; ii++) {
        carsArray[ii].update();
        carsArray[ii].draw();
    }
    for (let ii = 0; ii < logsArray.length; ii++) {
        logsArray[ii].update();
        logsArray[ii].draw();
    }

    for (let ii = 0; ii < carsArray.length; ii++) {
        if (collosion(frogger, carsArray[ii])) {
            ctx4.drawImage(collosions, 0, 100, 100, 100, frogger.x, frogger.y, 50, 50);
            resetGame();
        }
    }

    if (frogger.y < 250 && frogger.y > 90) {
        safe = false;
        for (let ii = 0; ii < logsArray.length; ii++) {
            if (collosion(frogger, logsArray[ii])) {
                frogger.x += logsArray[ii].speed;
                safe = true;
            }
            if (!safe) {
                for (let ii = 0; ii < maxParticles / 30; ii++) {
                    ripplesArray.unshift(new Particle(frogger.x, frogger.y));
                }
                resetGame();
            }
        }

    }

}