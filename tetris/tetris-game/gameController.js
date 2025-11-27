import { generateRandomTetromino, lockTetromino } from './generator.js';
import { moveDown, moveLeft, moveRight, rotate } from './movement.js';
import { findCompleteLines, clearLines, calculateScore } from './lineClearer.js';
import { checkCollision } from './collision.js';
export class GameController {
    constructor(state) {
        this.state = state;
        this.lastDropTime = 0;
        this.dropInterval = 1000;
    }
    startGame() {
        this.state.isPlaying = true;
        this.state.isPaused = false;
        this.state.isGameOver = false;
        this.state.score = 0;
        this.state.board.grid = Array(20).fill(null).map(() => Array(10).fill(null));
        this.state.nextTetromino = generateRandomTetromino();
        this.spawnTetromino();
    }
    pauseGame() {
        if (this.state.isPlaying && !this.state.isGameOver) {
            this.state.isPaused = true;
        }
    }
    resumeGame() {
        if (this.state.isPlaying && this.state.isPaused) {
            this.state.isPaused = false;
        }
    }
    resetGame() {
        this.startGame();
    }
    update(currentTime) {
        if (!this.state.isPlaying || this.state.isPaused || this.state.isGameOver) {
            return;
        }
        if (currentTime - this.lastDropTime > this.dropInterval) {
            this.moveDownAction();
            this.lastDropTime = currentTime;
        }
    }
    moveLeftAction() {
        if (!this.state.activeTetromino || this.state.isPaused || this.state.isGameOver) {
            return false;
        }
        return moveLeft(this.state.activeTetromino, this.state.board);
    }
    moveRightAction() {
        if (!this.state.activeTetromino || this.state.isPaused || this.state.isGameOver) {
            return false;
        }
        return moveRight(this.state.activeTetromino, this.state.board);
    }
    moveDownAction() {
        if (!this.state.activeTetromino || this.state.isPaused || this.state.isGameOver) {
            return false;
        }
        if (!moveDown(this.state.activeTetromino, this.state.board)) {
            lockTetromino(this.state.activeTetromino, this.state.board);
            this.clearCompletedLines();
            this.spawnTetromino();
            return false;
        }
        return true;
    }
    rotateAction() {
        if (!this.state.activeTetromino || this.state.isPaused || this.state.isGameOver) {
            return false;
        }
        return rotate(this.state.activeTetromino, this.state.board);
    }
    spawnTetromino() {
        this.state.activeTetromino = this.state.nextTetromino;
        this.state.nextTetromino = generateRandomTetromino();
        if (this.state.activeTetromino && checkCollision(this.state.activeTetromino, this.state.board)) {
            this.state.isGameOver = true;
            this.state.isPlaying = false;
        }
    }
    clearCompletedLines() {
        const lines = findCompleteLines(this.state.board);
        if (lines.length > 0) {
            clearLines(this.state.board, lines);
            this.state.score += calculateScore(lines.length);
        }
    }
}
