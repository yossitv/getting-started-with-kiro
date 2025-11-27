import { Tetromino } from './types.js';

export interface Board {
  grid: (string | null)[][];
  width: number;
  height: number;
}

export interface GameState {
  board: Board;
  activeTetromino: Tetromino | null;
  nextTetromino: Tetromino | null;
  score: number;
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
}

export function createBoard(width: number = 10, height: number = 20): Board {
  return {
    grid: Array(height).fill(null).map(() => Array(width).fill(null)),
    width,
    height
  };
}

export function createGameState(): GameState {
  return {
    board: createBoard(),
    activeTetromino: null,
    nextTetromino: null,
    score: 0,
    isPlaying: false,
    isPaused: false,
    isGameOver: false
  };
}
