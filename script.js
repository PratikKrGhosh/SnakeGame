const scoreBoard = document.querySelector(".scoreBoard");
const board = document.querySelector(".board");
const eatAudio = new Audio("./sounds/eat.mp3");
const moveAudio = new Audio("./sounds/move.mp3");
const gameOverAudio = new Audio("./sounds/gameover.mp3");
const bgmAudio = new Audio("./sounds/notPlaying.mp3");
let time = 5;
let lastPaintTime = 0;
let score = 0;
let speed = {x: 0, y: 0};
let food = {x: 6, y: 6}
let snake = [{x: 17, y: 17}];

scoreBoard.innerHTML = `Score: ${score}`; // displaying the score

// Function to update snake
const updateSnake = () =>{
    snake.unshift({x: snake[0].x + speed.x, y: snake[0].y + speed.y});
    snake.pop();
}

// Funtion to update food
const updateFood = () =>{
    if (snake[0].x === food.x && snake[0].y === food.y)
    {
        eatAudio.play();
        snake.unshift({x: snake[0].x + speed.x, y: snake[0].y + speed.y});
        let [a, b] = [2, 24];
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
        scoreBoard.innerHTML = `Score: ${++score}`;
    }
}

// Function to display snake
const showSnake = () =>{
    for (let i = 0; i < snake.length; i++)
    {
        let element = document.createElement("div")
        element.style.gridRowStart = snake[i].y;
        element.style.gridColumnStart = snake[i].x;
        element.classList.add(i === 0 ? "snakeHead" : "snakeBody");
        board.appendChild(element);
    }
}

// Function to display food
const showFood = () =>{
    let element = document.createElement("div");
    element.style.gridRowStart = food.y;
    element.style.gridColumnStart = food.x;
    element.classList.add("food");
    board.appendChild(element);
}

// Function for Collide
const hasCollide = (s) =>{
    for (let i = 1; i < snake.length; i++)
    {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y)
        {
            return true;
        }
    }

    if (s[0].x < 1 || s[0].x > 26 || s[0].y < 1 || s[0].y > 26)
    {
        return true;
    }

    return false;
}

const collide = () =>{
    if (hasCollide(snake))
    {
        gameOverAudio.play();
        bgmAudio.pause();
        speed = {x: 0, y: 0};
        alert("Game Over");
        score = 0;
        time = 5;
        snake = [{x: 17, y: 17}];
        scoreBoard.innerHTML = `Score: ${score}`;
    }
}

// Game Function
const gameEngine = () =>{
    board.innerHTML = "";

    // updating the snake and food
    updateSnake();
    updateFood();
    collide();

    // displaying snake and food
    showSnake();
    showFood();    
    bgmAudio.play();
}

// Main Function
const main = (ctime) =>{
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime)/1000 < 1/time)
    {
        return;
    }

    lastPaintTime = ctime;
    gameEngine();
}

window.requestAnimationFrame(main);

// controller
window.addEventListener("keydown", k =>{
    if (speed.x === 0 && speed.y === 0)
    {
        moveAudio.play();
        speed = {x: 0, y: -1};
    }
    else
    {
        switch(k.key)
        {
            case "ArrowRight":
                moveAudio.play();
                speed.x = 1;
                speed.y = 0;
                break;
            case "ArrowLeft":
                moveAudio.play();
                speed.x = -1;
                speed.y = 0;
                break;
            case "ArrowUp":
                moveAudio.play();
                speed.x = 0;
                speed.y = -1;
                break;
            case "ArrowDown":
                moveAudio.play();
                speed.x = 0;
                speed.y = 1;
                break;
            default:
                break;
        }
    }
})

window.setInterval(()=>{ time+=0.2; }, 4000); // increasing the speed of playing slowly