import { GameState } from './board.js';
import { Tetromino } from './types.js';

const CELL_SIZE = 30;

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private nextCtx: CanvasRenderingContext2D;

  constructor(
    private canvas: HTMLCanvasElement,
    private nextCanvas: HTMLCanvasElement,
    private scoreElement: HTMLElement,
    private gameOverElement: HTMLElement,
    private finalScoreElement: HTMLElement
  ) {
    this.ctx = canvas.getContext('2d')!;
    this.nextCtx = nextCanvas.getContext('2d')!;
  }

  render(state: GameState): void {
    this.clearCanvas();
    this.drawBoard(state);
    if (state.activeTetromino) {
      this.drawTetromino(state.activeTetromino);
    }
    this.drawNextTetromino(state.nextTetromino);
    this.updateScore(state.score);
    this.updateGameOver(state);
  }

  private clearCanvas(): void {
    this.ctx.fillStyle = '#0f0f1e';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawBoard(state: GameState): void {
    for (let y = 0; y < state.board.height; y++) {
      for (let x = 0; x < state.board.width; x++) {
        const color = state.board.grid[y][x];
        if (color) {
          this.drawCell(x, y, color);
        }
      }
    }
  }

  private drawTetromino(tetromino: Tetromino): void {
    const { shape, position, color } = tetromino;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          this.drawCell(position.x + x, position.y + y, color);
        }
      }
    }
  }

  private drawCell(x: number, y: number, color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    this.ctx.strokeStyle = '#000';
    this.ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }

  private drawNextTetromino(tetromino: Tetromino | null): void {
    this.nextCtx.fillStyle = '#0f0f1e';
    this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);

    if (!tetromino) return;

    const { shape, color } = tetromino;
    const offsetX = (4 - shape[0].length) / 2;
    const offsetY = (4 - shape.length) / 2;

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          this.nextCtx.fillStyle = color;
          this.nextCtx.fillRect(
            (offsetX + x) * CELL_SIZE,
            (offsetY + y) * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
          );
          this.nextCtx.strokeStyle = '#000';
          this.nextCtx.strokeRect(
            (offsetX + x) * CELL_SIZE,
            (offsetY + y) * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
          );
        }
      }
    }
  }

  private updateScore(score: number): void {
    this.scoreElement.textContent = score.toString();
  }

  private updateGameOver(state: GameState): void {
    if (state.isGameOver) {
      this.gameOverElement.classList.remove('hidden');
      this.finalScoreElement.textContent = state.score.toString();
    } else {
      this.gameOverElement.classList.add('hidden');
    }
  }
}
