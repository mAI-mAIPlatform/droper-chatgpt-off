// ============================================
// Crosshair UI
// ============================================

export class Crosshair {
    constructor() {
        this.create();
    }

    create() {
        this.element = document.createElement("div");
        this.element.innerHTML = "+";
        this.element.style.position = "fixed";
        this.element.style.top = "50%";
        this.element.style.left = "50%";
        this.element.style.transform = "translate(-50%, -50%)";
        this.element.style.fontSize = "28px";
        this.element.style.color = "white";
        this.element.style.pointerEvents = "none";

        document.body.appendChild(this.element);
    }
}