import { describe, it, expect } from 'vitest';
import { checkCollision, canMove } from './collision.js';
import { createBoard } from './board.js';
import * as fc from 'fast-check';
describe('Collision Detection', () => {
    const createTestTetromino = () => ({
        type: 'I',
        shape: [[1, 1, 1, 1]],
        position: { x: 3, y: 0 },
        color: '#00f0f0'
    });
    describe('Wall collision - 要件 1.5', () => {
        it('should detect left wall collision', () => {
            const board = createBoard();
            const tetromino = createTestTetromino();
            tetromino.position.x = 0;
            expect(checkCollision(tetromino, board, -1, 0)).toBe(true);
        });
        it('should detect right wall collision', () => {
            const board = createBoard();
            const tetromino = createTestTetromino();
            tetromino.position.x = 6;
            expect(checkCollision(tetromino, board, 1, 0)).toBe(true);
        });
    });
    describe('Floor collision - 要件 1.5', () => {
        it('should detect floor collision', () => {
            const board = createBoard();
            const tetromino = createTestTetromino();
            tetromino.position.y = 19;
            expect(checkCollision(tetromino, board, 0, 1)).toBe(true);
        });
    });
    describe('Block collision - 要件 1.5', () => {
        it('should detect collision with locked blocks', () => {
            const board = createBoard();
            board.grid[10][5] = '#00f0f0';
            const tetromino = createTestTetromino();
            tetromino.position = { x: 5, y: 9 };
            expect(checkCollision(tetromino, board, 0, 1)).toBe(true);
        });
    });
    describe('canMove function', () => {
        it('should return true for valid moves', () => {
            const board = createBoard();
            const tetromino = createTestTetromino();
            expect(canMove(tetromino, board, 1, 0)).toBe(true);
            expect(canMove(tetromino, board, 0, 1)).toBe(true);
        });
        it('should return false for invalid moves', () => {
            const board = createBoard();
            const tetromino = createTestTetromino();
            tetromino.position.x = 0;
            expect(canMove(tetromino, board, -1, 0)).toBe(false);
        });
    });
});
describe('Collision Property Tests', () => {
    /**
     * Feature: tetris-game, Property 3: 衝突時の位置不変性
     * 検証: 要件 1.5
     *
     * 任意のテトリミノとボード状態について、衝突が発生する移動を試みた場合、
     * テトリミノの位置と形状は変更されない必要があります
     */
    it('should maintain position invariance on collision', () => {
        fc.assert(fc.property(fc.integer({ min: 0, max: 10 }), fc.integer({ min: 0, max: 20 }), (x, y) => {
            const board = createBoard();
            const tetromino = {
                type: 'O',
                shape: [[1, 1], [1, 1]],
                position: { x, y },
                color: '#f0f000'
            };
            const originalX = tetromino.position.x;
            const originalY = tetromino.position.y;
            const originalShape = tetromino.shape;
            checkCollision(tetromino, board, 1, 1);
            expect(tetromino.position.x).toBe(originalX);
            expect(tetromino.position.y).toBe(originalY);
            expect(tetromino.shape).toBe(originalShape);
        }), { numRuns: 100 });
    });
});
