export function setupInputHandlers(controller) {
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                controller.moveLeftAction();
                break;
            case 'ArrowRight':
                event.preventDefault();
                controller.moveRightAction();
                break;
            case 'ArrowUp':
                event.preventDefault();
                controller.rotateAction();
                break;
            case 'ArrowDown':
                event.preventDefault();
                controller.moveDownAction();
                break;
            case ' ':
                event.preventDefault();
                if (controller['state'].isPaused) {
                    controller.resumeGame();
                }
                else {
                    controller.pauseGame();
                }
                break;
        }
    });
}
