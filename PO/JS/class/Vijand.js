/*  **********************************************************
    **      BEGIN klasse Vijand bij voorbeeld Levels        **
    ********************************************************** */
 // hallo 
let vijandAfbeeldingen = {};

class Vijand {
  constructor(l) {
    let mogelijkePosities = [4 * width / 12, 6 * width / 12, 8 * width / 12];
    this.x = random(mogelijkePosities); // Willekeurige x-positie uit de lijst
    this.y = 0; // Startpositie bovenaan het scherm
    this.grote = width / 12; // Grootte van de vijand
    this.snelheid = 3;
    this.kleur = 'blue';
  }
  beweeg() {
    this.y += this.snelheid;
  }

    teken() {
    push();
    noStroke();
    if (this.afbeelding) {
      imageMode(CENTER);
      image(this.afbeelding, this.x, this.y, this.grote, this.grote); // Teken de afbeelding van de vijand
    }
    pop();
  }
  raakt(Hero) {
    // Bereken de afstand tussen de held en de vijand
    const afstand = dist(this.x, this.y, Hero.x, Hero.y);
    const raakt = afstand <= (this.grote + Hero.grote) / 2; // Controleer of de vijand en held elkaar raken

    // Debug-output
    console.log(`Vijand raakt held: ${raakt}, Afstand: ${afstand}, Drempel: ${(this.grote + Hero.grote) / 2}`);
    return raakt; // Retourneer of de vijand de held raakt
  }
}
class VijandType1 extends Vijand {
  constructor(l) {
    super(l);
    this.kleur = 'red';
    this.afbeelding = vijandAfbeeldingen['Speelman'];
    this.snelheid += 1;
    this.y = height/2
  }
}
  
class VijandType2 extends Vijand {
  constructor(l) {
    super(l);
    this.kleur = 'green';
    this.afbeelding = vijandAfbeeldingen['Kloosterman'];
  }
}
  
class VijandType3 extends Vijand {
  constructor(l) {
    super(l);
    this.kleur = 'yellow';
    this.snelheid += 2;
    this.grote = width/6;
    this.afbeelding = vijandAfbeeldingen['Vanderveen'];
  }
}
  
class VijandType4 extends Vijand {
  constructor(l) {
    super(l);
    this.kleur = 'purple';
    this.afbeelding = vijandAfbeeldingen['Rugzak']
  }
}
 
class VijandType5 extends Vijand {
  constructor(l) {
    super(l);
    this.kleur = 'orange';
    this.grote = 30;
    this.snelheid += 4
  }
}
function randomVijand(l) {
  let types = [VijandType1, VijandType2, VijandType3, VijandType4, VijandType5];
  let gekozenType = random(types);
  return new gekozenType(l);
}
