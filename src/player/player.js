// ============================================
// Player central class
// ============================================

import { PlayerMovement } from "./movement.js";
import { Shooting } from "./shooting.js";
import { Gravity } from "../engine/physics/gravity.js";
import { PlayerHealth } from "../ui/playerHealth.js";

export class Player {

    constructor(camera, scene) {
        // Mesh
        const geo = new THREE.BoxGeometry(1,2,1);
        const mat = new THREE.MeshStandardMaterial({ color: 0x1e90ff });
        this.mesh = new THREE.Mesh(geo, mat);
        this.mesh.position.y = 1;

        scene.add(this.mesh);

        // Systems
        this.movement = new PlayerMovement(camera, this.mesh);
        this.gravity = new Gravity(this.mesh);
        this.health = new PlayerHealth(100);
        this.shooting = new Shooting(scene, camera);
    }

    update(delta) {
        this.movement.update(delta);
        this.gravity.update(delta);
        this.shooting.update(delta);
    }
}