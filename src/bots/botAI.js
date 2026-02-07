// ===============================
// Simple Bot AI (follow player)
// ===============================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";

export class BotAI {

    constructor(mesh, player) {
        this.mesh = mesh;
        this.player = player;

        this.speed = 3 + Math.random() * 2;
    }

    update(delta) {
        const direction = new THREE.Vector3()
            .subVectors(this.player.position, this.mesh.position);

        const distance = direction.length();

        if (distance > 1.5) {
            direction.normalize();

            this.mesh.position.add(
                direction.multiplyScalar(this.speed * delta)
            );

            // rotation vers le joueur
            this.mesh.lookAt(this.player.position);
        }
    }
}