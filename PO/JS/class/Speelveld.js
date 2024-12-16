let beginschermplaatjes = {};

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
    image(beginschermplaatjes['achtergrond'], 0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(32);
    fill('white');
    text('Welkom bij GANGRENNER!', width / 2, height / 2 - 50);
    textSize(20);
    text('Het spel waarbij je docenten moet ontwijken zodat je niet gepakt wordt!', width / 2, height / 2)
    text('Gebruik A en D om opzij te bewegen en K om invinceble te worden.', width / 2, height / 2 + 50);
    text('Druk op ENTER om te starten', width / 2, height / 2 + 100 )
    image(beginschermplaatjes['Vanderveen'], width / 8, height / 8, 250,250)
    //image(beginschermplaatjes, width / 8 + 600, height / 8, 280,180)
  }
  tekenActiefSpel() {
    // Controleer eerst of het spel niet voorbij is
    if (this.afgelopen) {
      this.eindScherm();
      return;
    }
  
    // Rest van de teken-logica
    noStroke();
    let kleuren = ['red', 'green', 'blue'];
    let aantalRijen = 3;
    let breedte = width / 6;
    let afstand = 0;
  
    let startX = (width - (aantalRijen * breedte + (aantalRijen - 1) * afstand)) / 2;
  
    for (let i = 0; i < aantalRijen; i++) {
      fill(kleuren[i]);
      let x = startX + i * (breedte + afstand);
      rect(x, 0, breedte, height);
    }
  
    this.updateVijanden();
    this.vijanden.forEach((vijand) => vijand.teken());
  
    textAlign(RIGHT, TOP);
    textSize(20);
    fill('white');
    if (Hero.invincibilityCooldown > 0) {
      let sec = Math.ceil(Hero.invincibilityCooldown / 60);
      text('Cooldown: ' + sec + 's', width - 20, 20);
    } else {
      text('Klaar!', width - 20, 20);
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
    
        // Controleer of de vijand de held raakt
        if (vijand.raakt(this.hero)) {
          // Spel afbreken
          this.spelStoppen();
        }
    
        // Verwijder vijanden die buiten het scherm zijn
        if (vijand.y > height) {
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
  spelStoppen() {
    this.afgelopen = true; // Stel de toestand in op 'game over'
    this.spelActief = false; // Zet het spel op pauze
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