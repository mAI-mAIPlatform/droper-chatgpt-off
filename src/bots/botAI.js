// ============================================
// Bot AI (movement + health + death)
// ============================================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";
import { HealthSystem } from "./healthSystem.js";

export class BotAI {

    constructor(mesh, player, scene) {
        this.mesh = mesh;
        this.player = player;
        this.scene = scene;

        this.speed = 3 + Math.random() * 2;
        this.health = new HealthSystem(100);

        this.alive = true;
    }

    // ===============================
    // DAMAGE
    // ===============================

    damage(amount) {
        const dead = this.health.damage(amount);

        if (dead) {
            this.die();
        }
    }

    die() {
        this.alive = false;
        this.scene.remove(this.mesh);
    }

    // ===============================
    // UPDATE
    // ===============================

    update(delta) {
        if (!this.alive) return;

        const dir = new THREE.Vector3()
            .subVectors(this.player.position, this.mesh.position);

        const dist = dir.length();

        // poursuivre le joueur
        if (dist > 1.5) {
            dir.normalize();

            this.mesh.position.add(
                dir.multiplyScalar(this.speed * delta)
            );

            this.mesh.lookAt(this.player.position);
        }
    }
}