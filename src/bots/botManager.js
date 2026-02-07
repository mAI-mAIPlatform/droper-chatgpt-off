// ===============================
// Bot Manager (spawn + update)
// ===============================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";
import { BotAI } from "./botAI.js";

export class BotManager {

    constructor(scene, playerMesh) {
        this.scene = scene;
        this.player = playerMesh;

        this.bots = [];
        this.count = 6; // nombre de bots

        this.spawnBots();
    }

    spawnBots() {
        for (let i = 0; i < this.count; i++) {

            const geo = new THREE.BoxGeometry(1, 2, 1);
            const mat = new THREE.MeshStandardMaterial({ color: 0xff3333 });

            const botMesh = new THREE.Mesh(geo, mat);

            botMesh.position.set(
                Math.random() * 40 - 20,
                1,
                Math.random() * 40 - 20
            );

            this.scene.add(botMesh);

            const ai = new BotAI(botMesh, this.player);

            this.bots.push(ai);
        }
    }

    update(delta) {
        this.bots.forEach(bot => bot.update(delta));
    }
}