import { Tetromino } from './types.js';
import { Board } from './board.js';
import { canMove, canRotate } from './collision.js';
import { rotateMatrix } from './tetrominos.js';

export function moveLeft(tetromino: Tetromino, board: Board): boolean {
  if (canMove(tetromino, board, -1, 0)) {
    tetromino.position.x--;
    return true;
  }
  return false;
}

export function moveRight(tetromino: Tetromino, board: Board): boolean {
  if (canMove(tetromino, board, 1, 0)) {
    tetromino.position.x++;
    return true;
  }
  return false;
}

export function moveDown(tetromino: Tetromino, board: Board): boolean {
  if (canMove(tetromino, board, 0, 1)) {
    tetromino.position.y++;
    return true;
  }
  return false;
}

export function rotate(tetromino: Tetromino, board: Board): boolean {
  const rotatedShape = rotateMatrix(tetromino.shape);
  if (canRotate(tetromino, rotatedShape, board)) {
    tetromino.shape = rotatedShape;
    return true;
  }
  return false;
}
