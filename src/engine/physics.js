// src/engine/physics.js

export default class Physics {
  constructor() {
    this.gravity = 0.6;
    this.groundY = 450;
  }

  applyGravity(entity) {
    entity.velocityY += this.gravity;
  }

  updatePosition(entity) {
    entity.x += entity.velocityX;
    entity.y += entity.velocityY;
  }

  handleGroundCollision(entity) {
    if (entity.y > this.groundY) {
      entity.y = this.groundY;
      entity.velocityY = 0;
      entity.onGround = true;
    } else {
      entity.onGround = false;
    }
  }

  checkCollision(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  update(entity) {
    this.applyGravity(entity);
    this.updatePosition(entity);
    this.handleGroundCollision(entity);
  }
}