import { createGameState } from './board.js';
import { GameController } from './gameController.js';
import { Renderer } from './renderer.js';
import { setupInputHandlers } from './input.js';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const nextCanvas = document.getElementById('nextCanvas') as HTMLCanvasElement;
const scoreElement = document.getElementById('score') as HTMLElement;
const gameOverElement = document.getElementById('gameOver') as HTMLElement;
const finalScoreElement = document.getElementById('finalScore') as HTMLElement;
const startBtn = document.getElementById('startBtn') as HTMLButtonElement;
const pauseBtn = document.getElementById('pauseBtn') as HTMLButtonElement;
const restartBtn = document.getElementById('restartBtn') as HTMLButtonElement;

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
  } else {
    controller.pauseGame();
    pauseBtn.textContent = 'Resume';
  }
});

restartBtn.addEventListener('click', () => {
  controller.resetGame();
  pauseBtn.textContent = 'Pause';
  pauseBtn.disabled = false;
});

function gameLoop(timestamp: number): void {
  controller.update(timestamp);
  renderer.render(state);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
