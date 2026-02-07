// ============================================
// Inventory UI placeholder
// ============================================

export class Inventory {

    constructor() {
        this.items = [];
        this.createUI();
    }

    createUI() {
        this.container = document.createElement("div");
        this.container.style.position = "fixed";
        this.container.style.bottom = "20px";
        this.container.style.right = "20px";
        this.container.style.background = "rgba(0,0,0,0.5)";
        this.container.style.color = "white";
        this.container.style.padding = "10px";
        this.container.innerHTML = "Inventory: empty";

        document.body.appendChild(this.container);
    }

    addItem(item) {
        this.items.push(item);
        this.container.innerHTML = "Inventory: " + this.items.join(", ");
    }
}