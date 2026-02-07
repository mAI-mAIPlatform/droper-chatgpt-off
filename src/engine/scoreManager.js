// ============================================
// Score Manager
// ============================================

export class ScoreManager {

    constructor() {
        this.score = 0;
    }

    add(amount = 1) {
        this.score += amount;
        console.log("🎯 Score:", this.score);
    }

    reset() {
        this.score = 0;
    }
}