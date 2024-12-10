
class Speelveld {
  constructor() {
  }

  // Methode om het speelveld te tekenen
  tekenBeginscherm() {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill('white');
    text('Welkom bij het spel!', width / 2, height / 2);
    textSize(20);
    text('Druk op Enter om te starten', width / 2, height / 2 + 50);
  }
  tekenActiefSpel() {
    noStroke(); // Geen rand om de rechthoeken
  
    let kleuren = ['red', 'green', 'blue']; // Kleuren voor de rechthoeken
    let aantalRijen = 3; // Aantal rechthoeken
    let breedte = width / 6; // Breedte van elke rechthoek
    let afstand = 0; // Afstand tussen de rechthoeken
  
    // Bereken de startpositie voor de eerste rechthoek
    let startX = (width - (aantalRijen * breedte + (aantalRijen - 1) * afstand)) / 2;
  
    for (let i = 0; i < aantalRijen; i++) {
      fill(kleuren[i]); // Kies de kleur van de rechthoek
      let x = startX + i * (breedte + afstand); // x-positie van de rechthoek
      rect(x, 0, breedte, height); // Teken een rechthoek over de hele hoogte
    }
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
