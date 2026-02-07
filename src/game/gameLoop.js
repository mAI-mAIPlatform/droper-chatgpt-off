// ============================================
// Main game loop
// ============================================

export class GameLoop {

    constructor(graphics) {
        this.graphics = graphics;
        this.lastTime = 0;

        this.start();
    }

    start() {
        requestAnimationFrame(this.loop.bind(this));
    }

    loop(time) {
        const delta = (time - this.lastTime) / 1000;
        this.lastTime = time;

        // update game systems
        this.graphics.update(delta);

        // render
        this.graphics.render();

        requestAnimationFrame(this.loop.bind(this));
    }
}