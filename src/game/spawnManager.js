// ============================================
// Spawn Manager
// ============================================

import * as THREE from "three";

export class SpawnManager {
    constructor(scene, player, botManager, loot) {
        this.scene = scene;
        this.player = player;
        this.botManager = botManager;
        this.loot = loot;
    }

    spawnLoot(amount = 5) {
        for (let i = 0; i < amount; i++) {
            const pos = new THREE.Vector3(
                Math.random() * 50 - 25,
                1,
                Math.random() * 50 - 25
            );
            this.loot.spawn(pos, Math.random() > 0.5 ? "ammo" : "health");
        }
    }

    spawnBots(amount = 5) {
        for (let i = 0; i < amount; i++) {
            this.botManager.createBot();
        }
    }
}