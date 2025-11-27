export function checkCollision(tetromino, board, dx = 0, dy = 0) {
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
export function canMove(tetromino, board, dx, dy) {
    return !checkCollision(tetromino, board, dx, dy);
}
export function canRotate(tetromino, rotatedShape, board) {
    const testTetromino = { ...tetromino, shape: rotatedShape };
    return !checkCollision(testTetromino, board);
}
