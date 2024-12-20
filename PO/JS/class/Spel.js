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
    this.afgelopen = false; 
    this.spelActief = true; 
    this.punten = 0;
    speelveld.vijanden = []; 
    speelveld.level = 1; 
    speelveld.spawnInterval = 1500; 
    hero.x = width / 2;  
    hero.y = height - width / 12;
    hero.invincible = false;  
    hero.invincibleTimer = 0;
    hero.invincibilityCooldown = 0;
    this.spelStarten(); 
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
    hero.teken();
    this.highScore = this.laadHighScore();
    if (speelveld.huidigeMuziek) {
      speelveld.huidigeMuziek.loop();
      console.log("Muziek opnieuw gestart");
    }
  }

  toonPunten() {
    textAlign(LEFT, TOP);
    textSize(width/100);
    fill('white');
    text(`Punten: ${this.punten}`, width/100, width/100); 
    text(`Highscore: ${this.highScore}`, width/100, width/50);
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
    localStorage.setItem('highScore', this.highScore); 
  }

  laadHighScore() {
    return parseInt(localStorage.getItem('highScore')) || 0; 
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
