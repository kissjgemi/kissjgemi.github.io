function animate() {
    ctx1.clearRect(0, 0, canvas1.width, canvas3.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas3.height);
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    ctx4.clearRect(0, 0, canvas4.width, canvas3.height);
    ctx5.clearRect(0, 0, canvas5.width, canvas3.height);
    ctx2.drawImage(background_1v12, 0, 0, canvas1.width, canvas1.height);
    ctx4.drawImage(grass, 0, 0, canvas1.width, canvas1.height);
    handleParticles();
    frogger.draw();
    frogger.update();
    handleObstacles();
    handleScoreBoard();
    frame++;
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('keydown', function (e) {
    keys[e.keyCode] = true;
    if (keys[37] || keys[38] || keys[39] || keys[40]) {
        frogger.jump();
    }
});

window.addEventListener('keyup', function (e) {
    delete keys[e.keyCode];
    frogger.moving = false;
    frogger.frameX = 0;
});

function scored() {
    score++;
    gameSpeed += 0.05;
    frogger.x = canvas3.width / 2 - frogger.width / 2;
    frogger.y = canvas3.height - frogger.height - 40;
}

function handleScoreBoard() {
    ctx4.fillStyle = 'black';
    ctx4.strokeStyle = 'black';
    let h = 15;
    ctx4.font = h + 'px Verdana';
    let text = 'Score';
    let x = canvas4.width / 2 - ctx4.measureText(text).width / 2;
    let y = h;
    ctx4.strokeText(text, x, y);

    ctx4.strokeText('Collosions: ' + collosionsCount, 10, 175);
    ctx4.strokeText('Game speed: ' + gameSpeed.toFixed(2), 10, 190);

    h = 60;
    ctx4.font = h + 'px Verdana';
    text = score;
    x = canvas4.width / 2 - ctx4.measureText(text).width / 2;
    y = h + 5;
    ctx4.fillText(text, x, y);
}

function collosion(first, second) {
    return !(first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y);
}

function resetGame() {
    frogger.x = canvas3.width / 2 - frogger.width / 2;
    frogger.y = canvas3.height - frogger.height - 40;
    score = 0;
    collosionsCount++;
    gameSpeed = 1;
}