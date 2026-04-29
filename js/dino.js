const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const retryBtn = document.getElementById("retryBtn");

let score = 0;
let highScore = 0;
let gameRunning = false;

let scoreInterval;
let collisionInterval;

/* ================= START GAME ================= */
function startGame(){
    if(gameRunning) return;

    gameRunning = true;
    score = 0;

    startScreen.style.display = "none";
    gameOverScreen.style.display = "none";

    cactus.classList.add("move");

    scoreInterval = setInterval(() => {
        score++;
        scoreText.innerText = "Score: " + score;

        if(score > highScore){
            highScore = score;
            highScoreText.innerText = "Best: " + highScore;
        }
    }, 100);

    collisionInterval = setInterval(checkCollision, 20);
}

/* ================= JUMP ================= */
function jump(){
    if(!gameRunning) startGame();

    if(!dino.classList.contains("jump")){
        dino.classList.add("jump");

        setTimeout(() => {
            dino.classList.remove("jump");
        }, 500);
    }
}

/* ================= COLLISION FIXED ================= */
function checkCollision(){
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    const isCollision =
        dinoRect.right > cactusRect.left + 10 &&
        dinoRect.left < cactusRect.right - 10 &&
        dinoRect.bottom > cactusRect.top + 10;

    if(isCollision){
        gameOver();
    }
}

/* ================= GAME OVER ================= */
function gameOver(){
    gameRunning = false;

    clearInterval(scoreInterval);
    clearInterval(collisionInterval);

    cactus.classList.remove("move");

    gameOverScreen.style.display = "flex";
}

/* ================= RESTART ================= */
retryBtn.addEventListener("click", () => {
    cactus.style.animation = "none";
    cactus.offsetHeight;
    cactus.style.animation = "";

    startGame();
});

/* ================= CONTROLS ================= */
document.addEventListener("keydown", (e) => {
    if(e.code === "Space"){
        jump();
    }
});

document.addEventListener("touchstart", () => {
    jump();
});