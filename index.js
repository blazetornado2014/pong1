const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let paddle1 = {
    posX: 10,
    posY: 150,
    sizeX: 20,
    sizeY: 80,
    color: 'green',
};

let paddle2 = {
    posX: 770,
    posY: 150,
    sizeX: 20,
    sizeY: 80,
    color: 'red',
}

let ball = {
    posX: 400,
    posY: 200,
    radius: 20,
    velocityX: 2,
    velocityY: 1,
    color: 'white',
}

let player1Score = 0;
let player2Score = 0;

let keys = {}

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});
document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});


function drawBoard(){
    //paddle1
    ctx.fillStyle = paddle1.color;
    ctx.fillRect(paddle1.posX, paddle1.posY, paddle1.sizeX, paddle1.sizeY);

    //paddle2
    ctx.fillStyle = paddle2.color;
    ctx.fillRect(paddle2.posX, paddle2.posY, paddle2.sizeX, paddle2.sizeY);

    //ball
    ctx.beginPath();
    ctx.arc(ball.posX, ball.posY, ball.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(player1Score + ' - ' + player2Score, canvas.width/2, 40);
}

function resetBall(){
    ball.posX = 400;
    ball.posY = 200;

    ball.velocityX = Math.random() < 0.5 ? -4: 4;
    ball.velocityY = (Math.random() - 0.5) * 4;
}

function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

     if (keys['w']) {
        paddle1.posY -= 5;
    }
    if (keys['s']) {
        paddle1.posY += 5; 
    }
    
    if (keys['ArrowUp']) {
        paddle2.posY -= 5;
    }
    if (keys['ArrowDown']) {
        paddle2.posY += 5;
    }

    //Paddle onscreen
    if (paddle1.posY < 0)
        paddle1.posY = 0;
    if (paddle2.posY < 0)
        paddle2.posY = 0

    if (paddle1.posY + paddle1.sizeY > canvas.height)
        paddle1.posY = canvas.height - paddle1.sizeY
    if (paddle2.posY + paddle2.sizeY > canvas.height)
        paddle2.posY = canvas.height - paddle2.sizeY

    //Ball Movement
    ball.posX += ball.velocityX;
    ball.posY += ball.velocityY;

    //Ball Collisions
    //Ball hits paddle2
    if ((ball.posX + ball.radius >= paddle2.posX) && 
    (ball.posY >= paddle2.posY) && (ball.posY <= paddle2.posY + paddle2.sizeY))
        ball.velocityX = -ball.velocityX

    //Ball hits paddle1
    if ((ball.posX - ball.radius <= paddle1.posX + paddle1.sizeX) &&
    (ball.posY >= paddle1.posY) && (ball.posY <= paddle1.posY + paddle1.sizeY))
        ball.velocityX = -ball.velocityX

    //Ball hits upper/bottom wall
    if (ball.posY - ball.radius < 0 || ball.posY + ball.radius >= canvas.height)
        ball.velocityY = -ball.velocityY

    //Ball hits left wall
    if (ball.posX - ball.radius <= 0){
        resetBall();
        player2Score++;
        if (player2Score >= 20)
            alert("Player 2 Wins");
    }

    //Ball hits right wall
     if (ball.posX + ball.radius >= canvas.width){
        resetBall();
        player1Score++;
        if (player1Score >= 20)
            alert("Player 1 Wins");
    }
    drawBoard();

    requestAnimationFrame(update);
}

update();

