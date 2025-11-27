import { describe, it, expect, beforeEach } from 'vitest';
import { GameController } from './gameController.js';
import { createGameState } from './board.js';
import * as fc from 'fast-check';
describe('GameController', () => {
    let controller;
    let state;
    beforeEach(() => {
        state = createGameState();
        controller = new GameController(state);
    });
    describe('State transitions - 要件 5.1, 5.2, 2.4', () => {
        it('should start game correctly', () => {
            controller.startGame();
            expect(state.isPlaying).toBe(true);
            expect(state.isPaused).toBe(false);
            expect(state.isGameOver).toBe(false);
            expect(state.activeTetromino).not.toBeNull();
        });
        it('should pause and resume game', () => {
            controller.startGame();
            controller.pauseGame();
            expect(state.isPaused).toBe(true);
            controller.resumeGame();
            expect(state.isPaused).toBe(false);
        });
        it('should reset game', () => {
            controller.startGame();
            state.score = 500;
            controller.resetGame();
            expect(state.score).toBe(0);
            expect(state.isPlaying).toBe(true);
        });
    });
});
describe('GameController Property Tests', () => {
    /**
     * Feature: tetris-game, Property 7: 一時停止のトグル動作
     * 検証: 要件 5.2
     *
     * 任意のゲーム状態について、一時停止操作を2回連続で実行すると、
     * 元の再生/一時停止状態に戻る必要があります
     */
    it('should toggle pause state correctly', () => {
        fc.assert(fc.property(fc.boolean(), (initialPaused) => {
            const state = createGameState();
            const controller = new GameController(state);
            controller.startGame();
            if (initialPaused) {
                controller.pauseGame();
            }
            const stateBefore = state.isPaused;
            if (stateBefore) {
                controller.resumeGame();
                controller.pauseGame();
            }
            else {
                controller.pauseGame();
                controller.resumeGame();
            }
            expect(state.isPaused).toBe(stateBefore);
        }), { numRuns: 100 });
    });
    /**
     * Feature: tetris-game, Property 8: 一時停止中の状態不変性
     * 検証: 要件 5.3
     *
     * 任意の一時停止中のゲーム状態について、時間が経過しても
     * ボード状態、アクティブなテトリミノの位置、スコアは変更されない必要があります
     */
    it('should maintain state invariance while paused', () => {
        fc.assert(fc.property(fc.integer({ min: 0, max: 10000 }), (time) => {
            const state = createGameState();
            const controller = new GameController(state);
            controller.startGame();
            controller.pauseGame();
            const scoreBefore = state.score;
            const positionBefore = state.activeTetromino ? { ...state.activeTetromino.position } : null;
            controller.update(time);
            expect(state.score).toBe(scoreBefore);
            if (positionBefore && state.activeTetromino) {
                expect(state.activeTetromino.position).toEqual(positionBefore);
            }
        }), { numRuns: 100 });
    });
});
