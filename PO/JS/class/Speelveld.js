var beginschermplaatjes = {};
var achtergrondmuziek = {};
var spelachtergrondY = 0;
var spelachtergrondGrote = 0;

var quotes = [
  "Hebbes, jij gaat met ons mee! En je ouders krijgen ook een belletje!",
  "Ben je helemaal betoeterd, ga je maar melden!",
  "Potverdikkie hé, doe jij dit thuis ook!? Ga maar heel rap naar mevrouw Speelman!",
  "Hier kommen jij! (Duits accent, oftwel je bent cooked R.I.P.)",
  "Zo jij bent snel, maar mij ga jij niet ontvluchten! (Ypie de Boer)",
  "Als je gewoon je boerenverstand had gebruikt was er niks aan de hand",
  "Heb je wel consent voor deze plaatjes?? Jan-Gerben Strikwerda",
];

var achtergronden = ["level 1", "level 2", "level 3"];
var huidigeAchtergrond = "level 1";
var huidigeMuziek;
var vorigeLevel = -1;
var eindschermplaatjes;

class Speelveld {
  static basisSnelheid = 3;
  
  constructor() {
    this.vijanden = [];
    this.laatsteVijandTijd = 0;
    this.spawnInterval = 1500;
    this.level = 1;
    this.levelTimer = millis();
    this.snelheid = Speelveld.basisSnelheid + this.level * 0.3;
    this.vorigeLevel = 0;
    huidigeMuziek = achtergrondmuziek["muziek1"];
    if (huidigeMuziek) {
      huidigeMuziek.loop();
      console.log("Start muziek: muziek1");
    }
  }

  tekenBeginscherm() {
    image(beginschermplaatjes['achtergrond'], 0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(width/20);
    fill('blue');
    text('Welkom bij GANGRENNER!', width / 2, height / 2 - 275);
    textSize(width/40);
    fill('red')
    text('Het spel waarbij je docenten moet ontwijken zodat je niet gepakt wordt!', width / 2, height / 2 - height/4.7)
    text('Gebruik A en D om opzij te bewegen en K om invincible te worden.', width / 2, height / 2 - height/15);
    text('Druk op ENTER om te starten', width / 2, height / 2 - height/7)
    image(beginschermplaatjes['Vanderveen'], width / 8, height - width / 5, width / 3, width / 5)
    image(beginschermplaatjes['Schadenberg'], width / 8 * 5, height - width / 4, width / 5, width / 4)
    this.huidigeAchtergrond = "level 1";
  }

  tekenActiefSpel() {
    if (spel.spelActief == false)
      noLoop()
    if (millis() - this.levelTimer >= 8000) {
      this.level++;
      this.levelTimer = millis();
      this.spawnInterval = max(700, this.spawnInterval - 100);
      console.log("Level omhoog! Huidig level:", this.level);
    }
    if (spelachtergrondGrote === 0) {
      spelachtergrondGrote = height;
    }
    if (this.level % 5 === 0 && this.level !== this.vorigeLevel) {
      this.huidigeAchtergrond = random(achtergronden);
      console.log(`Achtergrond veranderd naar: ${this.huidigeAchtergrond} op level ${this.level}`);
      this.vorigeLevel = this.level;
    
      if (huidigeMuziek && huidigeMuziek.isPlaying()) {
        huidigeMuziek.stop();
      }

      var nieuweMuziek = "muziek" + (achtergronden.indexOf(this.huidigeAchtergrond) + 1);
      huidigeMuziek = achtergrondmuziek[nieuweMuziek];
      if (huidigeMuziek) {
        huidigeMuziek.loop();
      }
    }

    image(spelachtergrond[this.huidigeAchtergrond], 0, spelachtergrondY, width, spelachtergrondGrote);
    image(spelachtergrond[this.huidigeAchtergrond], 0, spelachtergrondY - spelachtergrondGrote, width, spelachtergrondGrote);
    spelachtergrondY += 3 + this.level * 0.3;
    if (spelachtergrondY >= spelachtergrondGrote) {
      spelachtergrondY = 0;
    }
    if (this.afgelopen) {
      this.eindScherm();
      return;
    }

    this.updateVijanden();
    this.vijanden.forEach((vijand) => vijand.teken());

    textAlign(RIGHT, TOP);
    textSize(width/100);
    fill("white");
    text(`Level: ${this.level}`, width - width/80, height/20);
    if (hero.invincibilityCooldown > 0) {
      let sec = Math.ceil(hero.invincibilityCooldown / 60);
      text('Cooldown: ' + sec + 's', width - 20, 20);
    } else {
      text('Klaar!', width - 20, 20);
    }
  }

  updateVijanden() {
    if (millis() - this.laatsteVijandTijd > this.spawnInterval) {
      this.spawnVijand();
      this.laatsteVijandTijd = millis();
    }
    this.vijanden.forEach((vijand, index) => {
      if (vijand.y > height) {
        this.vijanden.splice(index, 1);
        spel.verhoogPunten();
      }
    });
    for (let i = 0; i < this.vijanden.length; i++) {
      this.vijanden[i].beweeg();
    }
    
    if (raakt(this.vijanden, hero)) {
      this.spelStoppen();
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
    spel.afgelopen = true;
    spel.spelActief = false;
    this.level = 1;
    this.spawnInterval = 1500;
  }

  eindScherm() {
    textAlign(CENTER, CENTER);
    image(eindschermplaatjes, 0, 0, width, height);
    textSize(12);
    fill('white');
    var maxWidth = 450;
    var maxHeight = 300;
    text(quotes, width / 8, height / 4, maxWidth, maxHeight);
  }
}
