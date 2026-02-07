import { BulletManager } from "./bulletManager.js";

export class Shooting {

    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;

        this.bullets = new BulletManager(scene);

        window.addEventListener("mousedown", () => {
            this.shoot();
        });
    }

    shoot() {
        this.bullets.spawn(this.camera);
    }

    update(delta) {
        this.bullets.update(delta);
    }
}