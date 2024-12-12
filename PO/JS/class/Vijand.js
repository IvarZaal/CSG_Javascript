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
    this.d = width/12;
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
      image(this.afbeelding, this.x, this.y, this.d, this.d); // Teken de afbeelding
    } else {
    }
    pop();
  }
}
  

class VijandType1 extends Vijand {
  constructor(l) {
    super(l);
    this.kleur = 'red';
    this.afbeelding = vijandAfbeeldingen['type1'];
    this.snelheid += 1;
    this.y = height/2
  }
}
  
class VijandType2 extends Vijand {
  constructor(l) {
    super(l);
    this.kleur = 'green';
    this.afbeelding = vijandAfbeeldingen['type2'];
  }
}
  
class VijandType3 extends Vijand {
  constructor(l) {
    super(l);
    this.kleur = 'yellow';
    this.snelheid += 2;
    this.d = width/6;
    this.afbeelding = vijandAfbeeldingen['type3'];
  }
}
  
class VijandType4 extends Vijand {
  constructor(l) {
    super(l);
    this.kleur = 'purple';

  }
}
 
class VijandType5 extends Vijand {
  constructor(l) {
    super(l);
    this.kleur = 'orange';
    this.d = 30;
    this.snelheid += 4
  }
}



function randomVijand(l) {
  let types = [VijandType1, VijandType2, VijandType3, VijandType4, VijandType5];
  let gekozenType = random(types);
  return new gekozenType(l);
}

/*  **********************************************************
    **       EINDE klasse Vijand bij voorbeeld Levels       **
    ********************************************************** */