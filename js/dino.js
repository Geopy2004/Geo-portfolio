let dino = document.getElementById("dino");
let cactus = document.getElementById("cactus");
let scoreDisplay = document.getElementById("score");
let highScoreDisplay = document.getElementById("highScore");
let retryBtn = document.getElementById("retryBtn");
let startScreen = document.getElementById("startScreen");

let score = 0;
let highScore = localStorage.getItem("dinoHighScore") || 0;
let isAlive = false;
let gameStarted = false;
let gameLoop;
let speed = 2;

highScoreDisplay.innerText = "Best: " + highScore;

// =======================
// START GAME
// =======================
function startGame() {
    if (gameStarted) return;

    gameStarted = true;
    isAlive = true;
    startScreen.style.display = "none";
    retryBtn.style.display = "none";

    cactus.style.display = "block";
    cactus.style.animation = `move ${speed}s linear infinite`;

    gameLoop = setInterval(updateGame, 100);
}

// =======================
// CONTROLS
// =======================
document.addEventListener("keydown", function (e) {
    if (e.code === "Space" || e.code === "ArrowUp") {
        if (!gameStarted) startGame();
        jump();
    }
});

document.addEventListener("click", function () {
    if (!gameStarted) startGame();
    jump();
});

// =======================
// JUMP
// =======================
function jump() {
    if (!isAlive) return;

    if (!dino.classList.contains("jump")) {
        dino.classList.add("jump");

        setTimeout(() => {
            dino.classList.remove("jump");
        }, 500);
    }
}

// =======================
// MAIN LOOP
// =======================
function updateGame() {
    let dinoBottom = parseInt(getComputedStyle(dino).getPropertyValue("bottom"));
    let cactusLeft = parseInt(getComputedStyle(cactus).getPropertyValue("right"));

    // Collision
    if (cactusLeft > 520 && cactusLeft < 580 && dinoBottom <= 40) {
        gameOver();
        return;
    }

    // Score
    score++;
    scoreDisplay.innerText = "Score: " + score;

    // Difficulty increase
    if (score % 100 === 0) {
        increaseDifficulty();
    }

    // Night mode
    if (score === 300) {
        document.body.classList.add("night");
    }
}

// =======================
// SPEED UP
// =======================
function increaseDifficulty() {
    if (speed > 0.8) {
        speed -= 0.15;
        cactus.style.animation = "none";
        cactus.offsetHeight;
        cactus.style.animation = `move ${speed}s linear infinite`;
    }
}

// =======================
// GAME OVER
// =======================
function gameOver() {
    isAlive = false;
    gameStarted = false;

    clearInterval(gameLoop);

    cactus.style.animation = "none";

    // Save High Score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("dinoHighScore", highScore);
        highScoreDisplay.innerText = "Best: " + highScore;
    }

    scoreDisplay.innerText = "Game Over! Score: " + score;
    retryBtn.style.display = "block";
}

// =======================
// RETRY
// =======================
retryBtn.addEventListener("click", restartGame);

function restartGame() {
    score = 0;
    speed = 2;

    document.body.classList.remove("night");

    scoreDisplay.innerText = "Score: 0";
    retryBtn.style.display = "none";

    cactus.style.right = "-30px";
    cactus.style.display = "block";

    startGame();
}