// src/game/weapons.js

export default class Weapon {
  constructor(name, damage, fireRate, range) {
    this.name = name;
    this.damage = damage;
    this.fireRate = fireRate;
    this.range = range;

    this.lastShot = 0;
  }

  canShoot() {
    return Date.now() - this.lastShot > this.fireRate;
  }

  shoot(shooter, targets) {
    if (!this.canShoot()) return;

    this.lastShot = Date.now();

    targets.forEach(target => {
      const dx = target.x - shooter.x;
      const dy = target.y - shooter.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= this.range) {
        target.health -= this.damage;
        console.log(`${this.name} hit ${target.name} for ${this.damage}`);
      }
    });
  }
}


// Presets style Fortnite
export const Weapons = {
  PISTOL: new Weapon("Pistol", 10, 400, 200),
  RIFLE: new Weapon("Rifle", 6, 120, 300),
  SHOTGUN: new Weapon("Shotgun", 25, 800, 120)
};