// ===============================
// FortniteClone - MAIN ENTRY
// ===============================

import { Graphics } from "./renderer/graphics.js";

class Game {
    constructor() {
        this.graphics = new Graphics();
        this.lastTime = 0;

        this.start();
    }

    start() {
        console.log("🔥 FortniteClone lancé !");
        this.loop(0);
    }

    loop(time) {
        const delta = (time - this.lastTime) / 1000;
        this.lastTime = time;

        this.update(delta);
        this.graphics.render();

        requestAnimationFrame(this.loop.bind(this));
    }

    update(delta) {
        // Ici on ajoutera :
        // player.update()
        // bots.update()
        // physics.update()

        this.graphics.update(delta);
    }
}

// Lancement du jeu
new Game();