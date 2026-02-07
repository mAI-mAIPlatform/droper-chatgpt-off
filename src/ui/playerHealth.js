// ============================================
// Player Health
// ============================================

export class PlayerHealth {

    constructor(max = 100) {
        this.max = max;
        this.hp = max;
    }

    damage(amount) {
        this.hp -= amount;

        if (this.hp < 0) this.hp = 0;

        return this.hp <= 0;
    }

    heal(amount) {
        this.hp = Math.min(this.max, this.hp + amount);
    }
}