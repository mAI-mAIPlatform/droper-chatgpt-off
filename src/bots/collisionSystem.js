import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";

export class CollisionSystem {

    static checkBulletHits(bots, bullets, scene) {

        bullets.forEach((bullet, bi) => {

            bots.forEach((bot, i) => {

                const dist = bullet.position.distanceTo(bot.mesh.position);

                if (dist < 1) {

                    const dead = bot.health.damage(50);

                    scene.remove(bullet);

                    if (dead) {
                        scene.remove(bot.mesh);
                        bots.splice(i, 1);
                        console.log("💥 Bot éliminé !");
                    }
                }
            });
        });
    }
}