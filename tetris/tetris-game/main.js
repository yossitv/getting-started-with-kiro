import { createGameState } from './board.js';
import { GameController } from './gameController.js';
import { Renderer } from './renderer.js';
import { setupInputHandlers } from './input.js';
const canvas = document.getElementById('gameCanvas');
const nextCanvas = document.getElementById('nextCanvas');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');
if (!canvas || !nextCanvas) {
    throw new Error('Canvas elements not found');
}
const state = createGameState();
const controller = new GameController(state);
const renderer = new Renderer(canvas, nextCanvas, scoreElement, gameOverElement, finalScoreElement);
setupInputHandlers(controller);
startBtn.addEventListener('click', () => {
    controller.startGame();
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    restartBtn.disabled = false;
});
pauseBtn.addEventListener('click', () => {
    if (state.isPaused) {
        controller.resumeGame();
        pauseBtn.textContent = 'Pause';
    }
    else {
        controller.pauseGame();
        pauseBtn.textContent = 'Resume';
    }
});
restartBtn.addEventListener('click', () => {
    controller.resetGame();
    pauseBtn.textContent = 'Pause';
    pauseBtn.disabled = false;
});
function gameLoop(timestamp) {
    controller.update(timestamp);
    renderer.render(state);
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
