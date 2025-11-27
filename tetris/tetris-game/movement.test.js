import { describe, it, expect } from 'vitest';
import { moveLeft, moveRight, moveDown } from './movement.js';
import { createBoard } from './board.js';
import * as fc from 'fast-check';
describe('Movement Property Tests', () => {
    /**
     * Feature: tetris-game, Property 1: テトリミノの移動の一貫性
     * 検証: 要件 1.1, 1.2
     *
     * 任意の有効なテトリミノと位置、および方向（左、右、下）について、
     * 衝突がない場合、移動操作は位置を正確に1マス指定された方向に変更する必要があります
     */
    it('should move exactly one cell in the specified direction', () => {
        fc.assert(fc.property(fc.integer({ min: 2, max: 7 }), fc.integer({ min: 2, max: 15 }), (x, y) => {
            const board = createBoard();
            // Test left movement
            const tetrominoLeft = {
                type: 'O',
                shape: [[1, 1], [1, 1]],
                position: { x, y },
                color: '#f0f000'
            };
            const originalX = tetrominoLeft.position.x;
            const moved = moveLeft(tetrominoLeft, board);
            if (moved) {
                expect(tetrominoLeft.position.x).toBe(originalX - 1);
                expect(tetrominoLeft.position.y).toBe(y);
            }
            // Test right movement
            const tetrominoRight = {
                type: 'O',
                shape: [[1, 1], [1, 1]],
                position: { x, y },
                color: '#f0f000'
            };
            const originalX2 = tetrominoRight.position.x;
            const movedRight = moveRight(tetrominoRight, board);
            if (movedRight) {
                expect(tetrominoRight.position.x).toBe(originalX2 + 1);
                expect(tetrominoRight.position.y).toBe(y);
            }
            // Test down movement
            const tetrominoDown = {
                type: 'O',
                shape: [[1, 1], [1, 1]],
                position: { x, y },
                color: '#f0f000'
            };
            const originalY = tetrominoDown.position.y;
            const movedDown = moveDown(tetrominoDown, board);
            if (movedDown) {
                expect(tetrominoDown.position.x).toBe(x);
                expect(tetrominoDown.position.y).toBe(originalY + 1);
            }
        }), { numRuns: 100 });
    });
});
