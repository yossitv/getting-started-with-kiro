import { describe, it, expect } from 'vitest';
import { findCompleteLines, clearLines, calculateScore } from './lineClearer.js';
import { createBoard } from './board.js';
import * as fc from 'fast-check';
describe('Line Clearer', () => {
    describe('findCompleteLines - 要件 3.1', () => {
        it('should find complete lines', () => {
            const board = createBoard();
            board.grid[19] = Array(10).fill('#00f0f0');
            const lines = findCompleteLines(board);
            expect(lines).toEqual([19]);
        });
        it('should find multiple complete lines', () => {
            const board = createBoard();
            board.grid[18] = Array(10).fill('#00f0f0');
            board.grid[19] = Array(10).fill('#f0f000');
            const lines = findCompleteLines(board);
            expect(lines).toEqual([18, 19]);
        });
        it('should return empty array when no complete lines', () => {
            const board = createBoard();
            const lines = findCompleteLines(board);
            expect(lines).toEqual([]);
        });
    });
    describe('clearLines - 要件 3.2', () => {
        it('should clear lines and move blocks down', () => {
            const board = createBoard();
            board.grid[17][5] = '#00f0f0';
            board.grid[19] = Array(10).fill('#f0f000');
            clearLines(board, [19]);
            expect(board.grid[19][5]).toBeNull();
            expect(board.grid[18][5]).toBe('#00f0f0');
        });
    });
    describe('calculateScore - 要件 3.3, 3.4', () => {
        it('should calculate correct score for different line counts', () => {
            expect(calculateScore(1)).toBe(100);
            expect(calculateScore(2)).toBe(300);
            expect(calculateScore(3)).toBe(500);
            expect(calculateScore(4)).toBe(800);
        });
    });
});
describe('Line Clearer Property Tests', () => {
    /**
     * Feature: tetris-game, Property 5: 完全なラインの削除と重力
     * 検証: 要件 3.1, 3.2
     *
     * 任意のボード状態について、完全なラインが削除された後、
     * 削除されたラインより上のすべてのブロックは正確に削除されたライン数だけ下に移動し、
     * ボードの総ブロック数は削除されたライン分だけ減少する必要があります
     */
    it('should maintain block count invariance after line clearing', () => {
        fc.assert(fc.property(fc.integer({ min: 1, max: 4 }), (numLines) => {
            const board = createBoard();
            // Place complete lines at the bottom
            for (let i = 0; i < numLines; i++) {
                board.grid[20 - 1 - i] = Array(10).fill('#00f0f0');
            }
            // Place a test block above the complete lines
            const testBlockY = 15;
            board.grid[testBlockY][5] = '#f0f000';
            const initialBlocks = board.grid.flat().filter(c => c !== null).length;
            const lines = findCompleteLines(board);
            expect(lines.length).toBe(numLines);
            clearLines(board, lines);
            const finalBlocks = board.grid.flat().filter(c => c !== null).length;
            // After clearing, block count should decrease by numLines * 10
            expect(finalBlocks).toBe(initialBlocks - numLines * 10);
            // The test block should move down by numLines
            expect(board.grid[testBlockY + numLines][5]).toBe('#f0f000');
        }), { numRuns: 100 });
    });
    /**
     * Feature: tetris-game, Property 6: スコアの単調性
     * 検証: 要件 3.3, 3.4
     *
     * 任意のライン削除について、削除されたライン数が多いほど、
     * 付与されるスコアは高くなる必要があります
     */
    it('should have monotonically increasing score', () => {
        fc.assert(fc.property(fc.integer({ min: 1, max: 3 }), (lines) => {
            const score1 = calculateScore(lines);
            const score2 = calculateScore(lines + 1);
            expect(score2).toBeGreaterThan(score1);
        }), { numRuns: 100 });
    });
});
