var vijandAfbeeldingen = {};

class Vijand {
  static basisSnelheid = 3;

  constructor(l) {
    let mogelijkePosities = [4 * width / 12, 6 * width / 12, 8 * width / 12];
    this.x = random(mogelijkePosities);
    this.y = 0;
    this.grote = width / 12;
    this.snelheid = Vijand.basisSnelheid + l * 0.3;
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
      image(this.afbeelding, this.x, this.y, this.grote, this.grote);
    } else {
      fill(this.kleur);
      ellipse(this.x, this.y, this.grote);
    }
    pop();
  }
}

class VijandType1 extends Vijand {
  constructor(l) {
    super(l);
    this.kleur = 'red';
    this.afbeelding = vijandAfbeeldingen['Kloosterman'];
    this.snelheid += 1;
    this.y = height / 4;
  }
}

class VijandType2 extends Vijand {
  constructor(l) {
    super(l);
    this.kleur = 'green';
    this.afbeelding = vijandAfbeeldingen['Speelman'];
  }
}

class VijandType3 extends Vijand {
  constructor(l) {
    super(l);
    this.kleur = 'yellow';
    this.snelheid += 2;
    this.grote = width / 6;
    this.afbeelding = vijandAfbeeldingen['Vanderveen'];
  }
}

class VijandType4 extends Vijand {
  constructor(l) {
    super(l);
    this.kleur = 'purple';
    this.afbeelding = vijandAfbeeldingen['Rugzak'];
  }
}

class VijandType5 extends Vijand {
  constructor(l) {
    super(l);
    this.kleur = 'orange';
    this.afbeelding = vijandAfbeeldingen['Stoel'];
  }
}

class VijandType6 extends Vijand {
  constructor(l) {
    super(l);
    this.kleur = 'red';
    this.snelheid += 5;
    this.afbeelding = vijandAfbeeldingen['Brugger'];
  }
}

class VijandType7 extends Vijand {
  constructor(l) {
    super(l);
    this.kleur = 'red';
    this.snelheid += 4;
    this.afbeelding = vijandAfbeeldingen['Dries'];
  }
}

class VijandType8 extends Vijand {
  constructor(l) {
    super(l);
    this.kleur = 'red';
    this.snelheid += 4;
    this.afbeelding = vijandAfbeeldingen['Gruber'];
  }
}

class VijandType9 extends Vijand {
  constructor(l) {
    super(l);
    this.kleur = 'red';
    this.snelheid += 2;
    this.afbeelding = vijandAfbeeldingen['Strikwerda'];
  }
}

function randomVijand(l) {
  var kans = random(105);
  if (kans < 20) {
    return new VijandType4(l); 
  } else if (kans < 40) {
    return new VijandType5(l); 
  } else if (kans < 60) {
    return new VijandType8(l); 
  } else if (kans < 70) {
    return new VijandType1(l); 
  } else if (kans < 80) {
    return new VijandType2(l); 
  } else if (kans < 90) {
    return new VijandType3(l); 
  } else if (kans < 95) {
    return new VijandType6(l);
  } else if (kans < 100) {
    return new VijandType7(l);
  } else { 
    return new VijandType9(l);
  }
}
