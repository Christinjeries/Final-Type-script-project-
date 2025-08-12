// Classes
class FlipFlop {
    img: string;
    x: number;
    y: number;

    constructor(img: string, x: number, y: number) {
        this.img = img;
        this.x = x;
        this.y = y;
    }
}

class Person {
    img: string;
    x: number;
    y: number;

    constructor(img: string, x: number, y: number) {
        this.img = img;
        this.x = x;
        this.y = y;
    }
}

class GameState {
    score: number;
    timeLeft: number;
    isRunning: boolean;

    constructor(score: number = 0, timeLeft: number = 60, isRunning: boolean = false) {
        this.score = score;
        this.timeLeft = timeLeft;
        this.isRunning = isRunning;
    }
}

// Data
const flipflop = new FlipFlop("./flipflop.jpg", 50, 50);  
const person = new Person("./person.jpg", 200, 200);      
const gameState = new GameState();

let gameTimer: number | null = null;

// View functions
function htmlFlipFlop(flipflop: FlipFlop): string {
    return `<div class="game__flipflop" style="left: ${flipflop.x}vw; top: ${flipflop.y}vh;">${flipflop.img}</div>`;
}

function htmlPerson(person: Person): string {
    return `<div class="game__person" style="left: ${person.x}vw; top: ${person.y}vh;">${person.img}</div>`;
}

function renderFlipFlop(flipflop: FlipFlop): void {
    try {
        const flipflopElement = document.getElementById("flipflop");
        if (!flipflopElement) throw new Error("FlipFlop element not found");
        
        flipflopElement.style.left = `${flipflop.x}px`; 
        flipflopElement.style.top = `${flipflop.y}px`;   
        flipflopElement.style.backgroundImage = `url(${flipflop.img})`;
        flipflopElement.style.backgroundSize = 'cover';
        flipflopElement.style.backgroundPosition = 'center';
    } catch (error) {
        console.error("Error rendering flipflop:", error);
    }
}

function renderPerson(person: Person): void {
    try {
        const personElement = document.getElementById("person");
        if (!personElement) throw new Error("Person element not found");
        
        personElement.style.left = `${person.x}px`;  
        personElement.style.top = `${person.y}px`;   
        personElement.style.backgroundImage = `url(${person.img})`;
        personElement.style.backgroundSize = 'cover';
        personElement.style.backgroundPosition = 'center';
    } catch (error) {
        console.error("Error rendering person:", error);
    }
}

function renderScore(score: number): void {
    try {
        const scoreElement = document.getElementById("score");
        if (!scoreElement) throw new Error("Score element not found");
        
        scoreElement.textContent = score.toString();
        
        
        scoreElement.classList.add("updated");
        setTimeout(() => {
            scoreElement.classList.remove("updated");
        }, 300);
    } catch (error) {
        console.error("Error rendering score:", error);
    }
}

function renderTimer(time: number): void {
    try {
        const timerElement = document.getElementById("timer");
        if (!timerElement) throw new Error("Timer element not found");
        
        timerElement.textContent = time.toString();
    } catch (error) {
        console.error("Error rendering timer:", error);
    }
}

function renderGameOver(finalScore: number): void {
    try {
        const modal = document.getElementById("gameOverModal");
        const finalScoreElement = document.getElementById("finalScore");
        
        if (!modal || !finalScoreElement) throw new Error("Game over elements not found");
        
        finalScoreElement.textContent = finalScore.toString();
        modal.style.display = "flex";
    } catch (error) {
        console.error("Error rendering game over:", error);
    }
}

function hideGameOver(): void {
    try {
        const modal = document.getElementById("gameOverModal");
        if (!modal) throw new Error("Game over modal not found");
        
        modal.style.display = "none";
    } catch (error) {
        console.error("Error hiding game over:", error);
    }
}

function showStartButton(): void {
    try {
        const startBtn = document.getElementById("startBtn");
        const restartBtn = document.getElementById("restartBtn");
        
        if (!startBtn || !restartBtn) throw new Error("Button elements not found");
        
        startBtn.style.display = "block";
        restartBtn.style.display = "none";
    } catch (error) {
        console.error("Error showing start button:", error);
    }
}

function showRestartButton(): void {
    try {
        const startBtn = document.getElementById("startBtn");
        const restartBtn = document.getElementById("restartBtn");
        
        if (!startBtn || !restartBtn) throw new Error("Button elements not found");
        
        startBtn.style.display = "none";
        restartBtn.style.display = "block";
    } catch (error) {
        console.error("Error showing restart button:", error);
    }
}

function addCollisionEffect(): void {
    try {
        const personElement = document.getElementById("person");
        if (!personElement) throw new Error("Person element not found");
        
        personElement.classList.add("game__person--collision");
        setTimeout(() => {
            personElement.classList.remove("game__person--collision");
        }, 200);
    } catch (error) {
        console.error("Error adding collision effect:", error);
    }
}

function renderAll(): void {
    renderFlipFlop(flipflop);
    renderPerson(person);
    renderScore(gameState.score);
    renderTimer(gameState.timeLeft);
}

// Controller functions
function handleKeyDown(event: KeyboardEvent): void {
    if (!gameState.isRunning) return;
    
    console.log("Key pressed:", event.key);
    
    
    const flipflopElement = document.getElementById("flipflop");
    if (flipflopElement) {
        flipflopElement.classList.add("rotating");
        
        
        setTimeout(() => {
            flipflopElement.classList.remove("rotating");
        }, 300); 
    }
    
    getNewFlipFlopPosition(event);
    renderFlipFlop(flipflop);
    
    if (checkCollision()) {
        handleCollision();
    }
}

function handleStartGame(): void {
    console.log("Starting game");
    
    // Model
    startGame();
    
    // View
    showRestartButton();
    renderAll();
}

function handleRestartGame(): void {
    console.log("Restarting game");
    
    // Model
    resetGame();
    
    // View
    showStartButton();
    hideGameOver();
    renderAll();
}

function handleCollision(): void {
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
function getNewFlipFlopPosition(event: KeyboardEvent): void {
    const step = 20;
    
    switch (event.key.toLowerCase()) {
        case "arrowup":
        case "w":
            if (flipflop.y > 0) flipflop.y -= step;
            break;
        case "arrowdown":
        case "s":
            if (flipflop.y < 740) flipflop.y += step; 
            break;
        case "arrowleft":
        case "a":
            if (flipflop.x > 0) flipflop.x -= step;
            break;
        case "arrowright":
        case "d":
            if (flipflop.x < 940) flipflop.x += step; 
            break;
    }
}

function movePersonToRandomPosition(): void {
    person.x = Math.random() * (940 - 60); 
    person.y = Math.random() * (740 - 60); 
}

function checkCollision(): boolean {
    
    const flipflopCenterX = flipflop.x + 30;
    const flipflopCenterY = flipflop.y + 30;
    const personCenterX = person.x + 30;
    const personCenterY = person.y + 30;
    
    const distance = Math.sqrt(
        Math.pow(flipflopCenterX - personCenterX, 2) + 
        Math.pow(flipflopCenterY - personCenterY, 2)
    );
    
    
    return distance < 50; 
}

function updateScore(): void {
    gameState.score += 10;
}

function startGame(): void {
    gameState.isRunning = true;
    gameState.timeLeft = 60;
    startTimer();
}

function resetGame(): void {
    gameState.score = 0;
    gameState.timeLeft = 60;
    gameState.isRunning = false;
    
    
    flipflop.x = 50;
    flipflop.y = 50; 
    movePersonToRandomPosition();
    
    stopTimer();
}

function startTimer(): void {
    gameTimer = setInterval(() => {
        gameState.timeLeft--;
        renderTimer(gameState.timeLeft);
        
        if (gameState.timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function stopTimer(): void {
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
}

function endGame(): void {
    gameState.isRunning = false;
    stopTimer();
    renderGameOver(gameState.score);
    showStartButton();
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    
    document.addEventListener('keydown', handleKeyDown);
    
    const startBtn = document.getElementById('startBtn');
    const restartBtn = document.getElementById('restartBtn');
    const playAgainBtn = document.getElementById('playAgainBtn');
    
    if (startBtn) startBtn.addEventListener('click', handleStartGame);
    if (restartBtn) restartBtn.addEventListener('click', handleRestartGame);
    if (playAgainBtn) playAgainBtn.addEventListener('click', handleRestartGame);
    
    // Initial render
    movePersonToRandomPosition();
    renderAll();
    showStartButton();
    
    console.log("Game initialized");
});