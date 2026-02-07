import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";

export class BulletManager {

    constructor(scene) {
        this.scene = scene;
        this.bullets = [];
        this.speed = 40;
    }

    spawn(camera) {
        const geo = new THREE.SphereGeometry(0.12, 8, 8);
        const mat = new THREE.MeshBasicMaterial({ color: 0xffff00 });

        const bullet = new THREE.Mesh(geo, mat);

        bullet.position.copy(camera.position);

        const dir = new THREE.Vector3();
        camera.getWorldDirection(dir);

        bullet.velocity = dir.multiplyScalar(this.speed);

        this.scene.add(bullet);
        this.bullets.push(bullet);
    }

    update(delta) {
        this.bullets.forEach((b, i) => {
            b.position.add(b.velocity.clone().multiplyScalar(delta));

            if (b.position.length() > 300) {
                this.scene.remove(b);
                this.bullets.splice(i, 1);
            }
        });
    }
}