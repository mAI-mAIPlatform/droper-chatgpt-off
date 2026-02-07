// ============================================
// Gravity + Jump System
// ============================================

export class Gravity {

    constructor(mesh) {
        this.mesh = mesh;

        this.velocityY = 0;
        this.gravity = -25;
        this.jumpForce = 10;

        this.grounded = true;

        window.addEventListener("keydown", (e) => {
            if (e.code === "Space") this.jump();
        });
    }

    jump() {
        if (!this.grounded) return;

        this.velocityY = this.jumpForce;
        this.grounded = false;
    }

    update(delta) {
        this.velocityY += this.gravity * delta;

        this.mesh.position.y += this.velocityY * delta;

        // sol
        if (this.mesh.position.y <= 1) {
            this.mesh.position.y = 1;
            this.velocityY = 0;
            this.grounded = true;
        }
    }
}