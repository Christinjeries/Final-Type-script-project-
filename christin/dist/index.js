// Classes
var FlipFlop = /** @class */ (function () {
    function FlipFlop(img, x, y) {
        this.img = img;
        this.x = x;
        this.y = y;
    }
    return FlipFlop;
}());
var Person = /** @class */ (function () {
    function Person(img, x, y) {
        this.img = img;
        this.x = x;
        this.y = y;
    }
    return Person;
}());
var GameState = /** @class */ (function () {
    function GameState(score, timeLeft, isRunning) {
        if (score === void 0) { score = 0; }
        if (timeLeft === void 0) { timeLeft = 60; }
        if (isRunning === void 0) { isRunning = false; }
        this.score = score;
        this.timeLeft = timeLeft;
        this.isRunning = isRunning;
    }
    return GameState;
}());
// Data
var flipflop = new FlipFlop("./flipflop.jpg", 50, 50);
var person = new Person("./person.jpg", 200, 200);
var gameState = new GameState();
var gameTimer = null;
// View functions
function htmlFlipFlop(flipflop) {
    return "<div class=\"game__flipflop\" style=\"left: " + flipflop.x + "vw; top: " + flipflop.y + "vh;\">" + flipflop.img + "</div>";
}
function htmlPerson(person) {
    return "<div class=\"game__person\" style=\"left: " + person.x + "vw; top: " + person.y + "vh;\">" + person.img + "</div>";
}
function renderFlipFlop(flipflop) {
    try {
        var flipflopElement = document.getElementById("flipflop");
        if (!flipflopElement)
            throw new Error("FlipFlop element not found");
        flipflopElement.style.left = flipflop.x + "px";
        flipflopElement.style.top = flipflop.y + "px";
        flipflopElement.style.backgroundImage = "url(" + flipflop.img + ")";
        flipflopElement.style.backgroundSize = 'cover';
        flipflopElement.style.backgroundPosition = 'center';
    }
    catch (error) {
        console.error("Error rendering flipflop:", error);
    }
}
function renderPerson(person) {
    try {
        var personElement = document.getElementById("person");
        if (!personElement)
            throw new Error("Person element not found");
        personElement.style.left = person.x + "px";
        personElement.style.top = person.y + "px";
        personElement.style.backgroundImage = "url(" + person.img + ")";
        personElement.style.backgroundSize = 'cover';
        personElement.style.backgroundPosition = 'center';
    }
    catch (error) {
        console.error("Error rendering person:", error);
    }
}
function renderScore(score) {
    try {
        var scoreElement_1 = document.getElementById("score");
        if (!scoreElement_1)
            throw new Error("Score element not found");
        scoreElement_1.textContent = score.toString();
        scoreElement_1.classList.add("updated");
        setTimeout(function () {
            scoreElement_1.classList.remove("updated");
        }, 300);
    }
    catch (error) {
        console.error("Error rendering score:", error);
    }
}
function renderTimer(time) {
    try {
        var timerElement = document.getElementById("timer");
        if (!timerElement)
            throw new Error("Timer element not found");
        timerElement.textContent = time.toString();
    }
    catch (error) {
        console.error("Error rendering timer:", error);
    }
}
function renderGameOver(finalScore) {
    try {
        var modal = document.getElementById("gameOverModal");
        var finalScoreElement = document.getElementById("finalScore");
        if (!modal || !finalScoreElement)
            throw new Error("Game over elements not found");
        finalScoreElement.textContent = finalScore.toString();
        modal.style.display = "flex";
    }
    catch (error) {
        console.error("Error rendering game over:", error);
    }
}
function hideGameOver() {
    try {
        var modal = document.getElementById("gameOverModal");
        if (!modal)
            throw new Error("Game over modal not found");
        modal.style.display = "none";
    }
    catch (error) {
        console.error("Error hiding game over:", error);
    }
}
function showStartButton() {
    try {
        var startBtn = document.getElementById("startBtn");
        var restartBtn = document.getElementById("restartBtn");
        if (!startBtn || !restartBtn)
            throw new Error("Button elements not found");
        startBtn.style.display = "block";
        restartBtn.style.display = "none";
    }
    catch (error) {
        console.error("Error showing start button:", error);
    }
}
function showRestartButton() {
    try {
        var startBtn = document.getElementById("startBtn");
        var restartBtn = document.getElementById("restartBtn");
        if (!startBtn || !restartBtn)
            throw new Error("Button elements not found");
        startBtn.style.display = "none";
        restartBtn.style.display = "block";
    }
    catch (error) {
        console.error("Error showing restart button:", error);
    }
}
function addCollisionEffect() {
    try {
        var personElement_1 = document.getElementById("person");
        if (!personElement_1)
            throw new Error("Person element not found");
        personElement_1.classList.add("game__person--collision");
        setTimeout(function () {
            personElement_1.classList.remove("game__person--collision");
        }, 200);
    }
    catch (error) {
        console.error("Error adding collision effect:", error);
    }
}
function renderAll() {
    renderFlipFlop(flipflop);
    renderPerson(person);
    renderScore(gameState.score);
    renderTimer(gameState.timeLeft);
}
// Controller functions
function handleKeyDown(event) {
    if (!gameState.isRunning)
        return;
    console.log("Key pressed:", event.key);
    var flipflopElement = document.getElementById("flipflop");
    if (flipflopElement) {
        flipflopElement.classList.add("rotating");
        setTimeout(function () {
            flipflopElement.classList.remove("rotating");
        }, 300);
    }
    getNewFlipFlopPosition(event);
    renderFlipFlop(flipflop);
    if (checkCollision()) {
        handleCollision();
    }
}
function handleStartGame() {
    console.log("Starting game");
    // Model
    startGame();
    // View
    showRestartButton();
    renderAll();
}
function handleRestartGame() {
    console.log("Restarting game");
    // Model
    resetGame();
    // View
    showStartButton();
    hideGameOver();
    renderAll();
}
function handleCollision() {
    console.log("Collision detected!");
    // Model
    updateScore();
    movePersonToRandomPosition();
    // View
    renderScore(gameState.score);
    renderPerson(person);
    addCollisionEffect();
}
// Model functions
function getNewFlipFlopPosition(event) {
    var step = 20;
    switch (event.key.toLowerCase()) {
        case "arrowup":
        case "w":
            if (flipflop.y > 0)
                flipflop.y -= step;
            break;
        case "arrowdown":
        case "s":
            if (flipflop.y < 740)
                flipflop.y += step;
            break;
        case "arrowleft":
        case "a":
            if (flipflop.x > 0)
                flipflop.x -= step;
            break;
        case "arrowright":
        case "d":
            if (flipflop.x < 940)
                flipflop.x += step;
            break;
    }
}
function movePersonToRandomPosition() {
    person.x = Math.random() * (940 - 60);
    person.y = Math.random() * (740 - 60);
}
function checkCollision() {
    var flipflopCenterX = flipflop.x + 30;
    var flipflopCenterY = flipflop.y + 30;
    var personCenterX = person.x + 30;
    var personCenterY = person.y + 30;
    var distance = Math.sqrt(Math.pow(flipflopCenterX - personCenterX, 2) +
        Math.pow(flipflopCenterY - personCenterY, 2));
    return distance < 50;
}
function updateScore() {
    gameState.score += 10;
}
function startGame() {
    gameState.isRunning = true;
    gameState.timeLeft = 60;
    startTimer();
}
function resetGame() {
    gameState.score = 0;
    gameState.timeLeft = 60;
    gameState.isRunning = false;
    flipflop.x = 50;
    flipflop.y = 50;
    movePersonToRandomPosition();
    stopTimer();
}
function startTimer() {
    gameTimer = setInterval(function () {
        gameState.timeLeft--;
        renderTimer(gameState.timeLeft);
        if (gameState.timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}
function stopTimer() {
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
}
function endGame() {
    gameState.isRunning = false;
    stopTimer();
    renderGameOver(gameState.score);
    showStartButton();
}
// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', handleKeyDown);
    var startBtn = document.getElementById('startBtn');
    var restartBtn = document.getElementById('restartBtn');
    var playAgainBtn = document.getElementById('playAgainBtn');
    if (startBtn)
        startBtn.addEventListener('click', handleStartGame);
    if (restartBtn)
        restartBtn.addEventListener('click', handleRestartGame);
    if (playAgainBtn)
        playAgainBtn.addEventListener('click', handleRestartGame);
    // Initial render
    movePersonToRandomPosition();
    renderAll();
    showStartButton();
    console.log("Game initialized");
});
