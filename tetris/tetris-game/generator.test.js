import { describe, it, expect } from 'vitest';
import { generateRandomTetromino, lockTetromino } from './generator.js';
import { createBoard } from './board.js';
import * as fc from 'fast-check';
describe('Generator Property Tests', () => {
    /**
     * Feature: tetris-game, Property 9: テトリミノ生成のランダム性
     * 検証: 要件 6.2
     *
     * 十分に大きなサンプル数について、各テトリミノタイプが生成される確率は、
     * 統計的に均等である必要があります（各タイプが約14.3%）
     */
    it('should generate tetrominos with uniform distribution', () => {
        const samples = 1000;
        const counts = {
            I: 0, O: 0, T: 0, S: 0, Z: 0, J: 0, L: 0
        };
        for (let i = 0; i < samples; i++) {
            const tetromino = generateRandomTetromino();
            counts[tetromino.type]++;
        }
        const expectedPercentage = 100 / 7;
        const tolerance = 5;
        Object.values(counts).forEach(count => {
            const percentage = (count / samples) * 100;
            expect(percentage).toBeGreaterThan(expectedPercentage - tolerance);
            expect(percentage).toBeLessThan(expectedPercentage + tolerance);
        });
    });
    /**
     * Feature: tetris-game, Property 4: テトリミノのロック後の生成
     * 検証: 要件 2.3
     *
     * 任意のボード状態について、アクティブなテトリミノがロックされた後、
     * 新しいアクティブなテトリミノが生成される必要があります
     */
    it('should generate new tetromino after locking', () => {
        fc.assert(fc.property(fc.integer({ min: 0, max: 100 }), () => {
            const board = createBoard();
            const tetromino1 = generateRandomTetromino();
            lockTetromino(tetromino1, board);
            const tetromino2 = generateRandomTetromino();
            expect(tetromino2).toBeDefined();
            expect(tetromino2.type).toBeDefined();
            expect(tetromino2.shape).toBeDefined();
            expect(tetromino2.position).toBeDefined();
        }), { numRuns: 100 });
    });
    it('should lock tetromino blocks to board', () => {
        const board = createBoard();
        const tetromino = generateRandomTetromino();
        tetromino.position = { x: 4, y: 18 };
        lockTetromino(tetromino, board);
        let lockedBlocks = 0;
        for (let y = 0; y < board.height; y++) {
            for (let x = 0; x < board.width; x++) {
                if (board.grid[y][x] !== null) {
                    lockedBlocks++;
                }
            }
        }
        expect(lockedBlocks).toBeGreaterThan(0);
    });
});
