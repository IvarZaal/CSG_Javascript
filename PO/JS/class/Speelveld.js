var beginschermplaatjes = {};
var spelachtergrond = {}
var quotes = [
 "Dit gedrag kunnen wij op school niet meer tolereren! Je bent geschorst!",
 "Hebbes, jij gaat met ons mee! En je ouders krijgen ook een belletje!",
 "Ben je helemaal betoeterd, ga je maar melden!",
 "Potverdikkie hé, doe jij dit thuis ook!? Ga maar heel rap naar mevrouw Speelman!",
 "Hier kommen jij! (Duits accent, oftwel je bent cooked R.I.P.)",
 "Zo jij bent snel, maar mij ga jij niet ontvluchten! (Ypie de Boer)",
];

class Speelveld {
  constructor() {
    this.vijanden = [];
    this.laatsteVijandTijd = 0;
    this.spawnInterval = 1500; // Tijd tussen vijand-spawns in ms
    this.level = 1; 
    this.levelTimer = millis();
    this.snelheid = 5;
  }

  // Methode om het speelveld te tekenen
  tekenBeginscherm() {
    image(beginschermplaatjes['achtergrond'], 0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(32);
    fill('white');
    text('Welkom bij GANGRENNER!', width / 2, height / 2 - 275);
    textSize(20);
    text('Het spel waarbij je docenten moet ontwijken zodat je niet gepakt wordt!', width / 2, height / 2 - 225)
    text('Gebruik A en D om opzij te bewegen en K om invinceble te worden.', width / 2, height / 2 - 175);
    text('Druk op ENTER om te starten', width / 2, height / 2 - 125)
    image(beginschermplaatjes['Vanderveen'], width / 8, height -width/5  , width/3,width/5)
    image(beginschermplaatjes['Schadenberg'], width / 8*5, height -width/4  , width/5,width/4)
  }
  tekenActiefSpel() {
    if (speelveld.level < 10 ){
      image(spelachtergrond['level 1'], 0, 0, width, height)
    }
    /*
    else if (speelveld.level < 20){
      Image(spelachtergrond['level 2'])
      }
      */
    // Controleer eerst of het spel niet voorbij is
    if (this.afgelopen) {
      this.eindScherm();
      return;
    }
  
    // Rest van de teken-logica
    noStroke();
    var kleuren = ['red', 'green', 'blue'];
    var aantalRijen = 3;
    var breedte = width / 6;
    var afstand = 0;
  
    var startX = (width - (aantalRijen * breedte + (aantalRijen - 1) * afstand)) / 2;
  
    if (millis() - this.levelTimer >= 15000) { // Controleer of 15 seconden zijn verstreken
      this.level++; // Verhoog het level
      Spel.level++;
      this.levelTimer = millis(); // Reset de timer naar de huidige tijd
      this.spawnInterval = max(1000, this.spawnInterval - 100); // Verkort spawn-interval, minimaal 200ms
      console.log("Level omhoog! Huidig level:", this.level);
      //for (let v = 0; v < this.vijanden.length; v++) {
      //  this.vijanden[v].snelheid += 1;
      vijand.snelheid += 5;
    }
    

    this.updateVijanden();
    this.vijanden.forEach((vijand) => vijand.teken());
  
    textAlign(RIGHT, TOP);
    textSize(20);
    fill('white');
    if (hero.invincibilityCooldown > 0) {
      let sec = Math.ceil(hero.invincibilityCooldown / 60);
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
    this.level = 1
    this.spawnInterval = 1500;
  }
  eindScherm() {
    // Game over-scherm
    textAlign(CENTER, CENTER);
    textSize(32);
    fill('white');
    text('Game Over!', width / 2, height / 2);
    var randomquotes = random(quotes)
    text(randomquotes, width / 2, height / 2 + 50)
    textSize(20);
    text('Druk op Enter om opnieuw te beginnen', width / 2, height / 2 + 100);
  }
}