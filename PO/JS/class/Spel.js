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
    if (this.afgelopen) {
      this.afgelopen = false; 
      this.spelActief = true; 
      this.punten = 0;        
      speelveld.tekenActiefSpel(); 
    }
  }

  spelStarten() {
    if (this.spelActief) {
      return; 
    }
    this.spelActief = true;
    this.beginscherm = false;
    this.verloren = false;
    this.afgelopen = false;
    this.punten = 0;
    speelveld.tekenActiefSpel(); 
    hero.teken()
    this.punten = 0; 
    this.highScore = this.laadHighScore(); 
    speelveld.controleerBotsing
  }
  toonPunten() {
    textAlign(LEFT, TOP);
    textSize(20);
    fill('white');
    text(`Punten: ${this.punten}`, 20, 20); 
    text(`Highscore: ${this.highScore}`, 20, 50); // zie colofon
  }

  verhoogPunten() {
    this.punten += 10; 
    if (this.punten > this.highScore) {
      this.highScore = this.punten; 
      this.slaHighScoreOp();
    }
  }

  resetPunten() {
    this.punten = 0; 
  }

  slaHighScoreOp() {
    localStorage.setItem('highScore', this.highScore); // zie colofon
  }

  laadHighScore() {
    return parseInt(localStorage.getItem('highScore')) || 0; // zie colofon
  }


  teken() {
    background('navy');

    if (this.beginscherm) {
      speelveld.tekenBeginscherm();
      if (keyIsDown(ENTER)) {
        this.spelStarten();
      }
    } else if (this.spelActief) {
      speelveld.tekenActiefSpel();
      this.toonPunten(); 
    } else if (this.afgelopen) {
      speelveld.eindScherm();
      this.toonPunten();
      if (keyIsDown(ENTER)) {
        this.nieuwSpel();
      }
    }
  }
}
