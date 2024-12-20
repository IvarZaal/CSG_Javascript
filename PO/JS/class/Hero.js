var Heroafbeelding;

class Hero {
  constructor() {
    this.y = height - width / 12; 
    this.x = width / 2; 
    this.grote = width / 9; 
    this.snelheid = width / 6; 
    this.movingLeft = false; 
    this.movingRight = false; 
    this.invincible = false; 
    this.invincibleTimer = 0; 
    this.invincibilityCooldown = 0; 
    this.isVlakbij = false;
  }

  teken() {
    if (this.invincible) {
      tint(255, 255, 255, 150); 
    } else {
      noTint();
    }
    image(Heroafbeelding, this.x - this.grote / 2, this.y - this.grote / 2, this.grote, this.grote);
    noTint();
    noStroke();
    if (keyIsPressed) {
      if (key === 'a' && !this.movingLeft) { 
        this.x -= this.snelheid;
        this.movingLeft = true;
      } else if (key === 'd' && !this.movingRight) {
        this.x += this.snelheid;
        this.movingRight = true;
      }
    } else {
      this.movingLeft = false;
      this.movingRight = false;
    }
    this.x = constrain(this.x, 4 * width / 12, width - 4 * width / 12);
    if (this.invincible) {
      this.invincibleTimer++;
      if (this.invincibleTimer > 180) {
        this.invincible = false;
        this.invincibleTimer = 0; 
      }
    }
    if (this.invincibilityCooldown > 0) {
      this.invincibilityCooldown--;
    }
  }

  maakOnschendbaar() {
    if (this.invincibilityCooldown <= 0) {
      this.invincible = true;
      this.invincibleTimer = 0;
      this.invincibilityCooldown = 600;
    }
  }
}
