class Spel {
  constructor() {
    this.level = null;
    this.punten = 0;
    this.spelActief = false;
    this.verloren = false;
    this.beginscherm = true;
    this.afgelopen = false;
    this.speelveld = new Speelveld(); // Speelveld-object voor spelweergave
    this.hero = new Hero
    this.vijand = new Vijand
  }

  nieuwSpel() {
    // Start een nieuw spel na het einde
    if (this.afgelopen) {
      this.afgelopen = false; // Reset eindscherm status
      this.spelActief = true; // Maak het spel actief
      this.punten = 0;        // Reset de punten
      this.speelveld.tekenActiefSpel(); // Reset het speelveld
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
    this.hero.teken()
    this.punten = 0; // Houd bij hoeveel punten de speler heeft
    this.highScore = this.laadHighScore(); // Laad de opgeslagen highscore
  }
  toonPunten() {
    textAlign(LEFT, TOP);
    textSize(20);
    fill('white');
    text(`Punten: ${this.punten}`, 20, 20); // Toon huidige score links boven
    text(`Highscore: ${this.highScore}`, 20, 50); // Toon de highscore
  }

  verhoogPunten() {
    this.punten += 10; // Verhoog punten met 10 bij elke vijand die je ontwijkt
    if (this.punten > this.highScore) {
      this.highScore = this.punten; // Update highscore als huidige punten hoger zijn
      this.slaHighScoreOp();
    }
  }

  resetPunten() {
    this.punten = 0; // Reset punten bij een nieuw spel
  }

  slaHighScoreOp() {
    localStorage.setItem('highScore', this.highScore); // Sla highscore op in de browser
  }

  laadHighScore() {
    return parseInt(localStorage.getItem('highScore')) || 0; // Laad opgeslagen highscore, standaard 0
  }


  teken() {
    background('navy');

    if (this.beginscherm) {
      this.speelveld.tekenBeginscherm();
      if (keyIsDown(ENTER)) {
        this.spelStarten();
      }
    } else if (this.spelActief) {
      this.speelveld.tekenActiefSpel();
      this.toonPunten(); // Toon de punten tijdens het spel
    } else if (this.afgelopen) {
      this.speelveld.eindScherm();
      this.toonPunten(); // Toon punten op het eindscherm
      if (keyIsDown(ENTER)) {
        this.nieuwSpel();
      }
    }
  }
}
