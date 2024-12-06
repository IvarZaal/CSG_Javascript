class Spel {
  constructor() {
    this.level = null;
    this.punten = 0;
    this.spelActief = false;
    this.verloren = false;
    this.beginscherm = true;
    this.afgelopen = false;
  }

  nieuwSpel() {
    // Laat het beginscherm zien
    if (this.beginscherm) {
      this.tekenBeginscherm();
      // Controleer of de speler het spel wil starten
      if (keyIsDown(ENTER)) {
        this.spelStarten();
      }
    }
  }

  spelStarten() {
    this.spelActief = true;
    this.beginscherm = false;
    this.verloren = false;
    this.afgelopen = false;
    this.punten = 0;
    console.log("Het spel is gestart!");
  }

  eindScherm() {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill('white');
    text('Game Over!', width / 2, height / 2);
    textSize(20);
    text('Druk op Enter om opnieuw te beginnen', width / 2, height / 2 + 50);
    if (keyIsDown(ENTER)) {
      this.nieuwSpel();
    }
  }

  tekenBeginscherm() {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill('white');
    text('Welkom bij het spel!', width / 2, height / 2);
    textSize(20);
    text('Druk op Enter om te starten', width / 2, height / 2 + 50);
  }

  teken() {
    background('navy');

    if (!this.spelActief) {
      if (this.afgelopen) {
        this.eindScherm();
      } else {
        this.nieuwSpel();
      }
    } else {
      // Hier teken je je actieve spel
      textAlign(LEFT, TOP);
      textSize(20);
      fill('white');
      text(`Punten: ${this.punten}`, 10, 10);

      // Voeg je spelinhoud hier toe
      // Als een bepaald verliesconditie wordt bereikt, stel dan this.afgelopen op true
    }
  }
}