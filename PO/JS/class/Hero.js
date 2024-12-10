
  class Hero {
    constructor() {
      this.y = height - width / 12 // Beginpositie van de held (onderaan het scherm)
      this.x = width / 2; // Horizontale positie (midden van het scherm)
      this.grote = width / 6; // Grootte van de held
      this.kleur = 'yellow'; // Kleur van de held
      this.snelheid = width / 6; // Stapgrootte voor beweging (1 stap)
      this.movingLeft = false; // Beweging naar links
      this.movingRight = false; // Beweging naar rechts
    }
  
    teken() {
      fill(this.kleur);
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
      this.x = constrain(this.x, 4*width / 12, width - 4*width / 12);
    }
  }
  