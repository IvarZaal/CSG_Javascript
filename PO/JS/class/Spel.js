class Spel {
  constructor() {
    this.level = null;
    this.punten = 0;
    this.spelActief = false;
    this.verloren = false;
    this.beginscherm = true;
    this.afgelopen = false;
    this.speelveld = new Speelveld(); // Speelveld-object voor spelweergave
  }

  nieuwSpel() {
    // Start een nieuw spel na het einde
    if (this.afgelopen) {
      this.afgelopen = false; // Reset eindscherm status
      this.spelActief = true; // Maak het spel actief
      this.punten = 0;        // Reset de punten
      this.speelveld.nieuwSpel(); // Reset het speelveld
    }
  }

  spelStarten() {
    if (this.spelActief) {
      return; // Als het spel al actief is, doe dan niets
    }

    this.spelActief = true;
    this.beginscherm = false;
    this.verloren = false;
    this.afgelopen = false;
    this.punten = 0;
    this.speelveld.tekenActiefSpel(); // Start het actieve spel

    console.log("Het spel is gestart!");
  }

  eindScherm() {
    // Game over-scherm
    textAlign(CENTER, CENTER);
    textSize(32);
    fill('white');
    text('Game Over!', width / 2, height / 2);
    textSize(20);
    text('Druk op Enter om opnieuw te beginnen', width / 2, height / 2 + 50);
    if (keyIsDown(ENTER)) {
      this.nieuwSpel(); // Start een nieuw spel wanneer Enter wordt ingedrukt
    }
  }

  teken() {
    // Hoofdtekenfunctie voor het spel
    background('navy');
    
    if (this.beginscherm) {
      // Als het spel nog niet is gestart, teken het beginscherm
      this.speelveld.tekenBeginscherm();
      if (keyIsDown(ENTER)) {
        this.spelStarten(); // Start het spel bij drukken op Enter
      }
    } else if (this.spelActief) {
      // Als het spel actief is, teken het actieve spel
      this.speelveld.tekenActiefSpel(); // Teken het actieve spel
    } else if (this.afgelopen) {
      // Als het spel is afgelopen, teken het eindscherm
      this.eindScherm();
    }
  }
}
