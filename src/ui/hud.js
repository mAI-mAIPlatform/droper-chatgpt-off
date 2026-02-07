// ============================================
// HUD UI
// ============================================

export class HUD {

    constructor(playerHealth) {
        this.health = playerHealth;
        this.score = 0;

        this.createUI();
    }

    createUI() {

        // crosshair
        const crosshair = document.createElement("div");
        crosshair.innerHTML = "+";

        crosshair.style.position = "fixed";
        crosshair.style.top = "50%";
        crosshair.style.left = "50%";
        crosshair.style.transform = "translate(-50%, -50%)";
        crosshair.style.fontSize = "30px";
        crosshair.style.color = "white";

        document.body.appendChild(crosshair);

        // infos
        this.info = document.createElement("div");

        this.info.style.position = "fixed";
        this.info.style.bottom = "20px";
        this.info.style.left = "20px";
        this.info.style.color = "white";
        this.info.style.fontSize = "18px";

        document.body.appendChild(this.info);
    }

    addScore() {
        this.score++;
    }

    update() {
        this.info.innerHTML =
            `❤️ HP: ${this.health.hp} | 🎯 Score: ${this.score}`;
    }
}