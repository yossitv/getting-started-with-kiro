import { Board } from './board.js';

export function findCompleteLines(board: Board): number[] {
  const completeLines: number[] = [];
  
  for (let y = 0; y < board.height; y++) {
    if (board.grid[y].every(cell => cell !== null)) {
      completeLines.push(y);
    }
  }
  
  return completeLines;
}

export function clearLines(board: Board, lines: number[]): void {
  const sortedLines = [...lines].sort((a, b) => b - a);
  
  for (const line of sortedLines) {
    board.grid.splice(line, 1);
  }
  
  for (let i = 0; i < lines.length; i++) {
    board.grid.unshift(Array(board.width).fill(null));
  }
}

export function calculateScore(linesCleared: number): number {
  const scores = [0, 100, 300, 500, 800];
  return scores[linesCleared] || 0;
}
