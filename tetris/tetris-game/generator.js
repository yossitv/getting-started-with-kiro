import { TETROMINOS } from './tetrominos.js';
const TETROMINO_TYPES = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
export function generateRandomTetromino() {
    const type = TETROMINO_TYPES[Math.floor(Math.random() * TETROMINO_TYPES.length)];
    const definition = TETROMINOS[type];
    return {
        type,
        shape: definition.shape.map(row => [...row]),
        position: { x: Math.floor((10 - definition.shape[0].length) / 2), y: 0 },
        color: definition.color
    };
}
export function lockTetromino(tetromino, board) {
    const { shape, position, color } = tetromino;
    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x]) {
                const boardY = position.y + y;
                const boardX = position.x + x;
                if (boardY >= 0 && boardY < board.height && boardX >= 0 && boardX < board.width) {
                    board.grid[boardY][boardX] = color;
                }
            }
        }
    }
}
