var beginschermplaatjes = {};
var achtergrondmuziek = {};
var spelachtergrondY = 0; // Startpositie van de achtergrond
var spelachtergrondGrote = 0; // Variabele voor de hoogte van de achtergrond
var quotes = [
 "Dit gedrag kunnen wij op school niet meer tolereren! Je bent geschorst!",
 "Hebbes, jij gaat met ons mee! En je ouders krijgen ook een belletje!",
 "Ben je helemaal betoeterd, ga je maar melden!",
 "Potverdikkie hé, doe jij dit thuis ook!? Ga maar heel rap naar mevrouw Speelman!",
 "Hier kommen jij! (Duits accent, oftwel je bent cooked R.I.P.)",
 "Zo jij bent snel, maar mij ga jij niet ontvluchten! (Ypie de Boer)",
 "Als je gewoon je boerenverstand had gebruikt was er niks aan de hand",
 "Heb je wel consent voor deze plaatjes?? Jan-Gerben Strikwerda",
];
var achtergronden = ["level 1", "level 2", "level 3", ]; // Namen van de achtergrondafbeeldingen
var huidigeAchtergrond = "level 1"; // Startachtergrond
var huidigeMuziek;
var vorigeLevel = -1;


class Speelveld {
  static basisSnelheid = 3; // Basissnelheid
  constructor() {
    this.vijanden = [];
    this.laatsteVijandTijd = 0;
    this.spawnInterval = 1500; // Tijd tussen vijand-spawns in ms
    this.level = 1; 
    this.levelTimer = millis();
    this.snelheid = Speelveld.basisSnelheid + this.level*0.3;
    this.vorigeLevel = 0;
    huidigeMuziek = achtergrondmuziek["muziek1"];
    if (huidigeMuziek) {
      huidigeMuziek.loop();
      console.log("Start muziek: muziek1");
    }
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
    if (millis() - this.levelTimer >= 1500) { // Controleer of 15 seconden zijn verstreken
      this.level++; // Verhoog het level
      this.levelTimer = millis(); // Reset de timer naar de huidige tijd
      this.spawnInterval = max(700, this.spawnInterval - 100); // Verkort spawn-interval, minimaal 200ms
      console.log("Level omhoog! Huidig level:", this.level);
    	}
    if (spelachtergrondGrote === 0) {
      spelachtergrondGrote = height; // Zet de hoogte van de achtergrond gelijk aan de canvas-hoogte
    }
    // Controleer of level een veelvoud van 5 is en of het level net is veranderd
    if (this.level % 5 === 0 && this.level !== this.vorigeLevel) {
      this.huidigeAchtergrond = random(achtergronden); // Kies een willekeurige achtergrond
      console.log(`Achtergrond veranderd naar: ${this.huidigeAchtergrond} op level ${this.level}`);
      this.vorigeLevel = this.level; // Update vorige level
    
      if (huidigeMuziek && huidigeMuziek.isPlaying()) {
        huidigeMuziek.stop();
      }

      // Kies nieuwe muziek op basis van de nieuwe achtergrond
      var nieuweMuziek = "muziek" + (achtergronden.indexOf(this.huidigeAchtergrond) + 1); // Genereer de naam van de nieuwe muziek
      huidigeMuziek = achtergrondmuziek[nieuweMuziek]; // Kies de bijbehorende muziek
      if (huidigeMuziek) {
        huidigeMuziek.loop(); // Start de nieuwe muziek
      }
    }

    image(spelachtergrond[this.huidigeAchtergrond], 0, spelachtergrondY, width, spelachtergrondGrote);
    image(spelachtergrond[this.huidigeAchtergrond], 0, spelachtergrondY - spelachtergrondGrote, width, spelachtergrondGrote);
    spelachtergrondY += 3 + this.level*0.3;
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
      text('Klaar!', width - 20, 20);}

  }
  


  updateVijanden() {
    if (millis() - this.laatsteVijandTijd > this.spawnInterval) {
      this.spawnVijand();
      this.laatsteVijandTijd = millis();
    }
      // Beweeg alle vijanden
      for (let i = 0; i < this.vijanden.length; i++) {
        spel.vijanden[i].beweeg();
      }
    
      // Controleer of de held geraakt wordt door een vijand
      if (raakt(spel.vijanden, hero)) {
        // Voer actie uit bij botsing (bijv. spel stoppen of levens verminderen)
        spel.spelStoppen();
      }
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
    var randomquotes = random(quotes)
    text(randomquotes, width / 2, height / 2 + 50)
    textSize(20);
  }

raakt(vijanden, hero) {
    for (let i = 0; i < this.vijanden.length; i++) {
      let vijand = this.vijanden[i];
  
      // Bereken de afstand tussen de held en de vijand
      let afstand = dist(hero.x, hero.y, vijand.x, vijand.y);
  
      // Controleer botsing op basis van de grootte (radius van cirkelvormige vijanden en hero)
      if (afstand < (hero.grote / 2 + vijand.grote / 2)) {
        console.log("Hero is geraakt door een vijand!");
        return true; // Hero is geraakt
      }
    }
    return false; // Geen botsing
  }
}