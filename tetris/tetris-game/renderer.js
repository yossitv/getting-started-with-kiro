const CELL_SIZE = 30;
export class Renderer {
    constructor(canvas, nextCanvas, scoreElement, gameOverElement, finalScoreElement) {
        this.canvas = canvas;
        this.nextCanvas = nextCanvas;
        this.scoreElement = scoreElement;
        this.gameOverElement = gameOverElement;
        this.finalScoreElement = finalScoreElement;
        this.ctx = canvas.getContext('2d');
        this.nextCtx = nextCanvas.getContext('2d');
    }
    render(state) {
        this.clearCanvas();
        this.drawBoard(state);
        if (state.activeTetromino) {
            this.drawTetromino(state.activeTetromino);
        }
        this.drawNextTetromino(state.nextTetromino);
        this.updateScore(state.score);
        this.updateGameOver(state);
    }
    clearCanvas() {
        this.ctx.fillStyle = '#0f0f1e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawBoard(state) {
        for (let y = 0; y < state.board.height; y++) {
            for (let x = 0; x < state.board.width; x++) {
                const color = state.board.grid[y][x];
                if (color) {
                    this.drawCell(x, y, color);
                }
            }
        }
    }
    drawTetromino(tetromino) {
        const { shape, position, color } = tetromino;
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    this.drawCell(position.x + x, position.y + y, color);
                }
            }
        }
    }
    drawCell(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        this.ctx.strokeStyle = '#000';
        this.ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
    drawNextTetromino(tetromino) {
        this.nextCtx.fillStyle = '#0f0f1e';
        this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
        if (!tetromino)
            return;
        const { shape, color } = tetromino;
        const offsetX = (4 - shape[0].length) / 2;
        const offsetY = (4 - shape.length) / 2;
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    this.nextCtx.fillStyle = color;
                    this.nextCtx.fillRect((offsetX + x) * CELL_SIZE, (offsetY + y) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                    this.nextCtx.strokeStyle = '#000';
                    this.nextCtx.strokeRect((offsetX + x) * CELL_SIZE, (offsetY + y) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                }
            }
        }
    }
    updateScore(score) {
        this.scoreElement.textContent = score.toString();
    }
    updateGameOver(state) {
        if (state.isGameOver) {
            this.gameOverElement.classList.remove('hidden');
            this.finalScoreElement.textContent = state.score.toString();
        }
        else {
            this.gameOverElement.classList.add('hidden');
        }
    }
}
