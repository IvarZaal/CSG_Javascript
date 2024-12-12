
class Speelveld {
  constructor() {
    this.vijanden = [];
    this.laatsteVijandTijd = 0;
    this.spawnInterval = 1000; // Tijd tussen vijand-spawns in ms
    this.level = 1; 
    this.hero = new Hero()
  }

  // Methode om het speelveld te tekenen
  tekenBeginscherm() {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill('white');
    text('Welkom bij GANGRENNER!', width / 2, height / 2);
    textSize(20);
    text('Gebruik A en D om te bewegen en K om invinceble te worden.', width / 2, height / 2 + 50);
    text('Druk op Enter om te starten', width / 2, height / 2 + 100 )
  }
  tekenActiefSpel() {
    noStroke(); // Geen rand om de rechthoeken
  
    let kleuren = ['red', 'green', 'blue']; // Kleuren voor de rechthoeken
    let aantalRijen = 3; // Aantal rechthoeken
    let breedte = width / 6; // Breedte van elke rechthoek
    let afstand = 0; // Afstand tussen de rechthoeken
  
    // Bereken de startpositie voor de eerste rechthoek
    let startX = (width - (aantalRijen * breedte + (aantalRijen - 1) * afstand)) / 2;
  
    for (let i = 0; i < aantalRijen; i++) {
      fill(kleuren[i]); // Kies de kleur van de rechthoek
      let x = startX + i * (breedte + afstand); // x-positie van de rechthoek
      rect(x, 0, breedte, height); // Teken een rechthoek over de hele hoogte
    }
    this.updateVijanden();
    this.vijanden.forEach((vijand) => vijand.teken());
      textAlign(RIGHT, TOP);
      textSize(20);
      fill('white');
      if (Hero.invincibilityCooldown > 0) {
        let sec = Math.ceil(Hero.invincibilityCooldown / 60); // Tijd in seconden
        text('Cooldown: ' + sec + 's', width - 20, 20); // Toon de cooldown tijd rechtsboven
      }
      else {
        text('Klaar!', width - 20, 20); // Toon "Klaar!" als de cooldown op 0 staat
      }
    }
  
  updateVijanden() {
    // Nieuwe vijanden genereren op basis van het spawn-interval
    if (millis() - this.laatsteVijandTijd > this.spawnInterval) {
      this.spawnVijand();
      this.laatsteVijandTijd = millis();
    }

    // Beweeg bestaande vijanden
    this.vijanden.forEach((vijand, index) => {
      vijand.beweeg();

      // Verwijder vijanden die buiten het scherm zijn
      if (vijand.x < 0) {
        this.vijanden.splice(index, 1);
      }
    });
  }
  spawnVijand() {
    this.vijanden.push(randomVijand(this.level));
  }

  tekenVijand() {
    const vijand = randomVijand(this.level);
    vijand.teken();
  }
  eindScherm() {
    // Game over-scherm
    textAlign(CENTER, CENTER);
    textSize(32);
    fill('white');
    text('Game Over!', width / 2, height / 2);
    textSize(20);
    text('Druk op Enter om opnieuw te beginnen', width / 2, height / 2 + 50);
  }
}