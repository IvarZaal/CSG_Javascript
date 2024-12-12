class Hero {
  constructor() {
    this.y = height - width / 12; // Beginpositie van de held (onderaan het scherm)
    this.x = width / 2; // Horizontale positie (midden van het scherm)
    this.grote = width / 12; // Grootte van de held
    this.kleur = 'yellow'; // Kleur van de held
    this.snelheid = width / 6; // Stapgrootte voor beweging (1 stap)
    this.movingLeft = false; // Beweging naar links
    this.movingRight = false; // Beweging naar rechts
    this.invincible = false; // Onschendbaarheid van de held
    this.invincibleTimer = 0; // Timer voor onschendbaarheid
    this.invincibilityCooldown = 0; // Cooldown voor onschendbaarheid
  }

  teken() {
    // Als de held onschendbaar is, teken een andere kleur (bijv. transparante geel)
    if (this.invincible) {
      fill(255, 255, 0, 150); // Gele kleur met transparantie
    } else {
      fill(this.kleur); // Normale kleur
    }

    noStroke();
    ellipse(this.x, this.y, this.grote); // Teken de held als een cirkel

    // Beweeg de held alleen als de toets wordt ingedrukt en niet voortdurend
    if (keyIsPressed) {
      if (key === 'a' && !this.movingLeft) { // A-toets voor links
        this.x -= this.snelheid;
        this.movingLeft = true;
      } else if (key === 'd' && !this.movingRight) { // D-toets voor rechts
        this.x += this.snelheid;
        this.movingRight = true;
      }
    } else {
      // Reset de beweging als de toets losgelaten wordt
      this.movingLeft = false;
      this.movingRight = false;
    }

    // Beperk de horizontale beweging van de held
    this.x = constrain(this.x, 4 * width / 12, width - 4 * width / 12);

    // Update de timer voor onschendbaarheid
    if (this.invincible) {
      this.invincibleTimer++;
      if (this.invincibleTimer > 180) { // Zet onschendbaarheid na 3 seconden uit (180 frames bij 60 fps)
        this.invincible = false;
        this.invincibleTimer = 0; // Reset de timer
      }
    }

    // Update de cooldown voor het opnieuw activeren van onschendbaarheid
    if (this.invincibilityCooldown > 0) {
      this.invincibilityCooldown--;
    }
  }

  maakOnschendbaar() {
    // Alleen als de cooldown voorbij is
    if (this.invincibilityCooldown <= 0) {
      this.invincible = true;
      this.invincibleTimer = 0; // Reset de timer
      this.invincibilityCooldown = 600; // Zet de cooldown op 10 seconden (600 frames)
    }
  }
}