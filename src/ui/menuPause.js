// ============================================
// Pause Menu (ESC)
// ============================================

export class PauseMenu {

    constructor() {
        this.paused = false;

        this.createUI();

        window.addEventListener("keydown", (e) => {
            if (e.code === "Escape") {
                this.toggle();
            }
        });
    }

    createUI() {
        this.overlay = document.createElement("div");

        this.overlay.style.position = "fixed";
        this.overlay.style.inset = "0";
        this.overlay.style.background = "rgba(0,0,0,0.7)";
        this.overlay.style.display = "none";
        this.overlay.style.color = "white";
        this.overlay.style.fontSize = "40px";
        this.overlay.style.justifyContent = "center";
        this.overlay.style.alignItems = "center";

        this.overlay.innerHTML = "⏸ PAUSE";

        this.overlay.style.display = "none";
        this.overlay.style.display = "flex";

        document.body.appendChild(this.overlay);
    }

    toggle() {
        this.paused = !this.paused;
        this.overlay.style.display = this.paused ? "flex" : "none";
    }
}