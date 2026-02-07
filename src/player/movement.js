// ===============================
// Player Movement (FPS style)
// ===============================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";
import { Keyboard } from "../input/keyboard.js";

export class PlayerMovement {

    constructor(camera, playerMesh) {
        this.camera = camera;
        this.mesh = playerMesh;

        this.keyboard = new Keyboard();

        this.speed = 8;
        this.velocity = new THREE.Vector3();

        this.initMouseLook();
    }

    initMouseLook() {
        document.body.addEventListener("click", () => {
            document.body.requestPointerLock();
        });

        document.addEventListener("mousemove", (e) => {
            if (document.pointerLockElement !== document.body) return;

            const sensitivity = 0.002;

            this.camera.rotation.y -= e.movementX * sensitivity;
            this.camera.rotation.x -= e.movementY * sensitivity;

            // limite haut/bas
            this.camera.rotation.x = Math.max(
                -Math.PI / 2,
                Math.min(Math.PI / 2, this.camera.rotation.x)
            );
        });
    }

    update(delta) {
        this.velocity.set(0, 0, 0);

        if (this.keyboard.isDown("KeyW")) this.velocity.z -= 1;
        if (this.keyboard.isDown("KeyS")) this.velocity.z += 1;
        if (this.keyboard.isDown("KeyA")) this.velocity.x -= 1;
        if (this.keyboard.isDown("KeyD")) this.velocity.x += 1;

        this.velocity.normalize();

        const move = this.velocity.clone()
            .applyQuaternion(this.camera.quaternion)
            .multiplyScalar(this.speed * delta);

        this.mesh.position.add(move);

        // caméra suit le joueur
        this.camera.position.copy(this.mesh.position).add(new THREE.Vector3(0, 1.6, 0));
    }
}