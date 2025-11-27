import { describe, it, expect } from 'vitest';
import { TETROMINOS, rotateMatrix } from './tetrominos.js';
import * as fc from 'fast-check';
const tetrominoTypes = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
describe('Tetromino Shape Definitions', () => {
    describe('Shape correctness - 要件 6.1', () => {
        it('should have all 7 tetromino types defined', () => {
            tetrominoTypes.forEach(type => {
                expect(TETROMINOS[type]).toBeDefined();
                expect(TETROMINOS[type].shape).toBeDefined();
            });
        });
        it('should have correct I tetromino shape', () => {
            const expected = [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];
            expect(TETROMINOS.I.shape).toEqual(expected);
        });
        it('should have correct O tetromino shape', () => {
            const expected = [
                [1, 1],
                [1, 1]
            ];
            expect(TETROMINOS.O.shape).toEqual(expected);
        });
        it('should have correct T tetromino shape', () => {
            const expected = [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]
            ];
            expect(TETROMINOS.T.shape).toEqual(expected);
        });
        it('should have correct S tetromino shape', () => {
            const expected = [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0]
            ];
            expect(TETROMINOS.S.shape).toEqual(expected);
        });
        it('should have correct Z tetromino shape', () => {
            const expected = [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0]
            ];
            expect(TETROMINOS.Z.shape).toEqual(expected);
        });
        it('should have correct J tetromino shape', () => {
            const expected = [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0]
            ];
            expect(TETROMINOS.J.shape).toEqual(expected);
        });
        it('should have correct L tetromino shape', () => {
            const expected = [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0]
            ];
            expect(TETROMINOS.L.shape).toEqual(expected);
        });
    });
    describe('Color uniqueness - 要件 6.3', () => {
        it('should have unique colors for each tetromino type', () => {
            const colors = tetrominoTypes.map(type => TETROMINOS[type].color);
            const uniqueColors = new Set(colors);
            expect(uniqueColors.size).toBe(7);
        });
        it('should have valid color format for all tetrominos', () => {
            tetrominoTypes.forEach(type => {
                const color = TETROMINOS[type].color;
                expect(color).toMatch(/^#[0-9a-f]{6}$/i);
            });
        });
    });
});
describe('Rotation Logic - Property-Based Tests', () => {
    /**
     * Feature: tetris-game, Property 2: 回転の形状保存
     * 検証: 要件 1.3
     *
     * 任意のテトリミノについて、4回連続で回転すると元の形状に戻る必要があります
     */
    it('should preserve shape after 4 consecutive rotations', () => {
        fc.assert(fc.property(fc.constantFrom(...tetrominoTypes), (tetrominoType) => {
            const original = TETROMINOS[tetrominoType].shape;
            // Rotate 4 times
            let rotated = rotateMatrix(original);
            rotated = rotateMatrix(rotated);
            rotated = rotateMatrix(rotated);
            rotated = rotateMatrix(rotated);
            // After 4 rotations, should return to original shape
            expect(rotated).toEqual(original);
        }), { numRuns: 100 });
    });
    /**
     * Feature: tetris-game, Property 10: 回転後の形状整合性
     * 検証: 要件 6.4
     *
     * 任意のテトリミノタイプについて、回転後の形状は、そのテトリミノタイプの有効な回転状態のいずれかと一致する必要があります
     */
    it('should maintain valid shape after rotation', () => {
        fc.assert(fc.property(fc.constantFrom(...tetrominoTypes), (tetrominoType) => {
            const original = TETROMINOS[tetrominoType].shape;
            const rotated = rotateMatrix(original);
            // Check that rotated shape has same dimensions
            expect(rotated.length).toBe(original.length);
            // Check that rotated shape contains same number of blocks
            const originalBlocks = original.flat().filter(x => x === 1).length;
            const rotatedBlocks = rotated.flat().filter(x => x === 1).length;
            expect(rotatedBlocks).toBe(originalBlocks);
        }), { numRuns: 100 });
    });
});
