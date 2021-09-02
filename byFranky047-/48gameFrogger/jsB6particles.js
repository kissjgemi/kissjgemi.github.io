class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = Math.random() * 20 + 1;
        this.opacity = Math.random();
        this.dX = Math.random() - 0.5;
        this.dY = Math.random() - 0.5;
    }

    draw() {
        ctx3.fillStyle = 'rgba(150,150,150,' + this.opacity + ')';
        ctx3.beginPath();
        ctx3.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx3.fill();
    }

    update() {
        this.x += this.dX;
        this.y += this.dY;
        if (this.opacity > 0.5) {
            this.opacity -= 0.49;
        }
        if (this.r > 0.15) {
            this.r -= 0.14;
        }
    }

    drawRipple() {
        ctx1.strokeStyle = 'rgba(255,255,255,' + this.opacity + ')';
        ctx1.beginPath();
        ctx1.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx1.stroke();
    }

    ripple() {
        if (this.r < 50) {
            this.r += 0.5;
            this.x -= 0.1;
            this.y -= 0.1;
        }
        if (this.opacity > 0) {
            this.opacity -= 0.005;
        }
    }
}

function handleParticles() {
    for (let ii = 0; ii < particlesArray.length; ii++) {
        particlesArray[ii].update();
        particlesArray[ii].draw();
    }
    if (particlesArray.length > maxParticles) {
        for (let ii = 0; ii < 30; ii++) {
            particlesArray.pop();
        }
    }
    if ((keys[37] || keys[38] || keys[39] || keys[40]) && frogger.y > 250 && particlesArray.length < maxParticles + 10) {
        for (let ii = 0; ii < 10; ii++) {
            particlesArray.unshift(new Particle(frogger.x + frogger.width / 2, frogger.y + frogger.height / 2));
        }
    }

    for (let ii = 0; ii < ripplesArray.length; ii++) {
        ripplesArray[ii].ripple();
        ripplesArray[ii].drawRipple();
    }

    if (ripplesArray.length > maxParticles / 15) {
        for (let ii = 0; ii < maxParticles / 15; ii++) {
            ripplesArray.pop();
        }
    }

    if ((keys[37] || keys[38] || keys[39] || keys[40]) && frogger.y < 250) {
        for (let ii = 0; ii < maxParticles / 30; ii++) {
            ripplesArray.unshift(new Particle(frogger.x + frogger.width / 2, frogger.y + frogger.height / 2));
        }
    }
}