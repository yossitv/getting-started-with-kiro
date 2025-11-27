export function createBoard(width = 10, height = 20) {
    return {
        grid: Array(height).fill(null).map(() => Array(width).fill(null)),
        width,
        height
    };
}
export function createGameState() {
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
