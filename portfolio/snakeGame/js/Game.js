const gameBoard = document.getElementById("gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.getElementById("scoreText");
const resetBtn = document.getElementById("resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const snakeColorHead = "rgb(247, 188, 136)" //"rgb(240, 214, 180)"
const snakeColorTail = "hsl(175, 52%, 35%)";
const darkerBoardBackround = "rgb(30, 123, 30)";
const darkBoardBackround = "rgb(40, 164, 40)";
const lightBoardBackround = "rgb(50, 205, 50)";
const lighterBoardBackround = "rgb(91, 215, 91)";
const foodColor = "rgb(153, 17, 17)";
const foodColorLight = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];
function gameStart() {
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick() {
    if (running) {
        setTimeout(()=> {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75)
    } else {
        displayGameOver()
    }
};
function clearBoard() {
    let isOdd = false;
    for (let i = 0; i < gameWidth / unitSize; i++) {
        for (let j = 0; j <= gameHeight / unitSize; j++) {
            let gradient = ctx.createLinearGradient(j*unitSize,i*unitSize + (unitSize / 2), j*unitSize + unitSize, i*unitSize + (unitSize / 2));
            if (isOdd) {
                gradient.addColorStop(0, darkerBoardBackround)
                gradient.addColorStop(1, darkBoardBackround)
            } else {
                gradient.addColorStop(0, lightBoardBackround);
                gradient.addColorStop(1, lighterBoardBackround);
            }
            ctx.fillStyle = gradient;
            ctx.fillRect(j*unitSize, i*unitSize, unitSize, unitSize);
            isOdd = !isOdd;
        }
    }
};
function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize
        return randNum;
    } 
    let occupiedSpace = snake.some(snakePart => snakePart.x === foodX && snakePart.y === foodY);
    do {
        foodX = randomFood(0, gameWidth - unitSize);
        foodY = randomFood(0, gameWidth - unitSize);
        occupiedSpace = snake.some(snakePart => snakePart.x === foodX && snakePart.y === foodY);
    } while (occupiedSpace); 
};
function drawFood() {
    let gradient = ctx.createLinearGradient(foodX, foodY + (unitSize / 2), foodX + unitSize, foodY + (unitSize / 2));
    gradient.addColorStop(0, foodColor);
    gradient.addColorStop(1, foodColorLight);
    ctx.fillStyle = gradient;
    ctx.fillRect(foodX, foodY, unitSize, unitSize)
};
function moveSnake() {
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity};
    snake.unshift(head);
    // if food is eaten
    if (snake[0].x === foodX && snake[0].y === foodY) {
        score+= 1;
        scoreText.textContent = score;
        createFood()
    } else {
        snake.pop()
    }
};
function drawSnake() {
    
    let gradient = ctx.createLinearGradient(snake[0].x, snake[0].y, snake[snake.length - 1].x, snake[snake.length - 1].y);
    gradient.addColorStop(0,snakeColorHead);
    gradient.addColorStop(1, snakeColorTail);
    ctx.fillStyle = gradient;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize)
    })
};
function changeDirection(event) {
    const keyPressed = event.keyCode;

    const leftKey = 37;
    const upKey = 38;
    const rightKey = 39;
    const downKey = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch (true) {
        case (keyPressed == leftKey && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == upKey && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case (keyPressed == rightKey && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == downKey && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
};
function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false
            break;
        case (snake[0].x >= gameWidth):
            running = false
            break;
        case (snake[0].y < 0):
            running = false
            break;
        case (snake[0].y >= gameHeight):
            running = false
            break;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
    }
};
function displayGameOver() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;
};
function resetGame() {
    if (!running) {
        score = 0;
        xVelocity = unitSize;
        yVelocity = 0;
        snake = [
            {x:unitSize * 4, y:0},
            {x:unitSize * 3, y:0},
            {x:unitSize * 2, y:0},
            {x:unitSize, y:0},
            {x:0, y:0}
        ];
        gameStart();
    }
};

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();