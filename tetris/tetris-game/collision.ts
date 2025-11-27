import { Tetromino } from './types.js';
import { Board } from './board.js';

export function checkCollision(tetromino: Tetromino, board: Board, dx: number = 0, dy: number = 0): boolean {
  const { shape, position } = tetromino;
  
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const newX = position.x + x + dx;
        const newY = position.y + y + dy;
        
        if (newX < 0 || newX >= board.width || newY >= board.height) {
          return true;
        }
        
        if (newY >= 0 && board.grid[newY][newX] !== null) {
          return true;
        }
      }
    }
  }
  
  return false;
}

export function canMove(tetromino: Tetromino, board: Board, dx: number, dy: number): boolean {
  return !checkCollision(tetromino, board, dx, dy);
}

export function canRotate(tetromino: Tetromino, rotatedShape: number[][], board: Board): boolean {
  const testTetromino = { ...tetromino, shape: rotatedShape };
  return !checkCollision(testTetromino, board);
}
