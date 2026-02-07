// ============================================
// Loot system
// ============================================

import * as THREE from "three";

export class Loot {
    constructor(scene) {
        this.scene = scene;
        this.items = [];
    }

    spawn(position, type = "ammo") {
        const geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const mat = new THREE.MeshStandardMaterial({ color: type === "ammo" ? 0xffff00 : 0x00ff00 });

        const item = new THREE.Mesh(geo, mat);
        item.position.copy(position);
        item.userData = { type: type };

        this.scene.add(item);
        this.items.push(item);
    }

    checkPickup(player) {
        this.items.forEach((item, i) => {
            const dist = item.position.distanceTo(player.mesh.position);
            if (dist < 1.5) {
                // ramassage
                console.log(`Loot picked: ${item.userData.type}`);
                this.scene.remove(item);
                this.items.splice(i, 1);
            }
        });
    }
}