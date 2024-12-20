var beginschermplaatjes = {};
var spelachtergrondY = 0; // Startpositie van de achtergrond
var spelachtergrondGrote = 0; // Variabele voor de hoogte van de achtergrond
var quotes = [
 "Dit gedrag kunnen wij op school niet meer tolereren! Je bent geschorst!",
 "Hebbes, jij gaat met ons mee! En je ouders krijgen ook een belletje!",
 "Ben je helemaal betoeterd, ga je maar melden!",
 "Potverdikkie hé, doe jij dit thuis ook!? Ga maar heel rap naar mevrouw Speelman!",
 "Hier kommen jij! (Duits accent, oftwel je bent cooked R.I.P.)",
 "Zo jij bent snel, maar mij ga jij niet ontvluchten! (Ypie de Boer)",
];
var achtergronden = ["level 1", "level 2", "level 3", ]; // Namen van de achtergrondafbeeldingen
var huidigeAchtergrond = "level 1"; // Startachtergrond

class Speelveld {
  constructor() {
    this.vijanden = [];
    this.laatsteVijandTijd = 0;
    this.spawnInterval = 1500; // Tijd tussen vijand-spawns in ms
    this.level = 1; 
    this.levelTimer = millis();
    this.snelheid = 3+this.level*0.3;
    this.vorigeLevel = 0;
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
    this.huidigeAchtergrond = "level 1"; // Startachtergrond
  }
  tekenActiefSpel() {
    if (spelachtergrondGrote === 0) {
      spelachtergrondGrote = height; // Zet de hoogte van de achtergrond gelijk aan de canvas-hoogte
    }
    
    // Controleer of level een veelvoud van 5 is en of het level net is veranderd
    if (this.level % 5 === 0 && this.level !== this.vorigeLevel) {
      this.huidigeAchtergrond = random(achtergronden); // Kies een willekeurige achtergrond
      console.log(`Achtergrond veranderd naar: ${this.huidigeAchtergrond} op level ${this.level}`);
      this.vorigeLevel = this.level; // Update vorige level
    }
    
    // Teken de huidige achtergrond
    image(spelachtergrond[this.huidigeAchtergrond], 0, spelachtergrondY, width, spelachtergrondGrote);

    // Teken een tweede achtergrond erboven om de overgang te maskeren
    image(spelachtergrond[this.huidigeAchtergrond], 0, spelachtergrondY - spelachtergrondGrote, width, spelachtergrondGrote);
    
    // Scroll de achtergrond omlaag
    spelachtergrondY += this.snelheid;

    // Als de eerste achtergrond uit beeld is, reset de positie
    if (spelachtergrondY >= spelachtergrondGrote) {
      spelachtergrondY = 0;
    }

    if (this.afgelopen) {
      this.eindScherm();
      return;
    }

    // Update vijanden en toon spelstatus
    this.updateVijanden();
    this.vijanden.forEach((vijand) => vijand.teken());

    textAlign(RIGHT, TOP);
    textSize(20);
    fill("white");
    text(`Level: ${this.level}`, width - 20, 20);
    if (hero.invincibilityCooldown > 0) {
      let sec = Math.ceil(hero.invincibilityCooldown / 60);
      text('Cooldown: ' + sec + 's', width - 20, 20);
    } else {
      text('Klaar!', width - 20, 20);
      if (millis() - this.levelTimer >= 1500) { // Controleer of 15 seconden zijn verstreken
        this.level++; // Verhoog het level
        this.levelTimer = millis(); // Reset de timer naar de huidige tijd
        this.spawnInterval = max(700, this.spawnInterval - 100); // Verkort spawn-interval, minimaal 200ms
        console.log("Level omhoog! Huidig level:", this.level);
      }
    }
  }
  


  updateVijanden() {
    if (millis() - this.laatsteVijandTijd > this.spawnInterval) {
      this.spawnVijand();
      this.laatsteVijandTijd = millis();
    }
  
    this.vijanden.forEach((vijand, index) => {
      vijand.beweeg();
      if (vijand.y > height) {
        this.vijanden.splice(index, 1); // Verwijder vijand die uit het scherm is
        spel.verhoogPunten(); // Verhoog de punten als de vijand is ontwijkt
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