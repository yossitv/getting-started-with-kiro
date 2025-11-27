import { canMove, canRotate } from './collision.js';
import { rotateMatrix } from './tetrominos.js';
export function moveLeft(tetromino, board) {
    if (canMove(tetromino, board, -1, 0)) {
        tetromino.position.x--;
        return true;
    }
    return false;
}
export function moveRight(tetromino, board) {
    if (canMove(tetromino, board, 1, 0)) {
        tetromino.position.x++;
        return true;
    }
    return false;
}
export function moveDown(tetromino, board) {
    if (canMove(tetromino, board, 0, 1)) {
        tetromino.position.y++;
        return true;
    }
    return false;
}
export function rotate(tetromino, board) {
    const rotatedShape = rotateMatrix(tetromino.shape);
    if (canRotate(tetromino, rotatedShape, board)) {
        tetromino.shape = rotatedShape;
        return true;
    }
    return false;
}
