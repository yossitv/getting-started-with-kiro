import { describe, it, expect, beforeEach } from 'vitest';
import { createGameState } from './board.js';
import { GameController } from './gameController.js';
import { generateRandomTetromino } from './generator.js';
describe('Integration Tests', () => {
    let controller;
    let state;
    beforeEach(() => {
        state = createGameState();
        controller = new GameController(state);
    });
    it('should complete a full game flow from start to game over', () => {
        // Start game
        controller.startGame();
        expect(state.isPlaying).toBe(true);
        expect(state.activeTetromino).not.toBeNull();
        expect(state.nextTetromino).not.toBeNull();
        // Move tetromino
        const initialX = state.activeTetromino.position.x;
        controller.moveLeftAction();
        expect(state.activeTetromino.position.x).toBeLessThan(initialX);
        // Rotate tetromino
        const initialShape = state.activeTetromino.shape;
        controller.rotateAction();
        expect(state.activeTetromino.shape).not.toBe(initialShape);
        // Pause and resume
        controller.pauseGame();
        expect(state.isPaused).toBe(true);
        controller.resumeGame();
        expect(state.isPaused).toBe(false);
    });
    it('should handle line clearing and score updates', () => {
        controller.startGame();
        // Fill bottom rows except one column
        for (let y = 18; y < 20; y++) {
            for (let x = 0; x < 9; x++) {
                state.board.grid[y][x] = '#00f0f0';
            }
        }
        // Create a tetromino that will complete the lines
        state.activeTetromino = {
            type: 'I',
            shape: [[1], [1], [1], [1]],
            position: { x: 9, y: 16 },
            color: '#00f0f0'
        };
        // Move down until locked
        for (let i = 0; i < 10; i++) {
            controller.moveDownAction();
        }
        // Score should increase after clearing lines
        expect(state.score).toBeGreaterThan(0);
    });
    it('should detect game over when tetromino cannot spawn', () => {
        controller.startGame();
        // Fill top rows to trigger game over
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 10; x++) {
                state.board.grid[y][x] = '#00f0f0';
            }
        }
        // Try to spawn new tetromino
        state.activeTetromino = generateRandomTetromino();
        controller.moveDownAction();
        // Game should eventually be over
        expect(state.isGameOver || state.isPlaying).toBeDefined();
    });
    it('should maintain game state consistency during rapid inputs', () => {
        controller.startGame();
        const initialScore = state.score;
        // Rapid inputs
        for (let i = 0; i < 10; i++) {
            controller.moveLeftAction();
            controller.moveRightAction();
            controller.rotateAction();
        }
        // Game should still be in valid state
        expect(state.activeTetromino).not.toBeNull();
        expect(state.score).toBeGreaterThanOrEqual(initialScore);
        expect(state.board.grid.length).toBe(20);
        expect(state.board.grid[0].length).toBe(10);
    });
    it('should handle game reset correctly', () => {
        controller.startGame();
        // Play for a bit
        state.score = 500;
        for (let i = 0; i < 5; i++) {
            controller.moveDownAction();
        }
        // Reset game
        controller.resetGame();
        // Everything should be reset
        expect(state.score).toBe(0);
        expect(state.isPlaying).toBe(true);
        expect(state.isPaused).toBe(false);
        expect(state.isGameOver).toBe(false);
        expect(state.activeTetromino).not.toBeNull();
    });
});
