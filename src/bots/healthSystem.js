export class HealthSystem {

    constructor(max = 100) {
        this.max = max;
        this.hp = max;
    }

    damage(amount) {
        this.hp -= amount;
        return this.hp <= 0;
    }

    reset() {
        this.hp = this.max;
    }
}