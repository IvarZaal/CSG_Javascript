

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('blue');
  textFont("Monospace");
  textSize(40);
  textAlign(CENTER, CENTER);
  frameRate(60);
  Spel = new Spel()
  Hero = new Hero()
}

function preload() {
  vijandAfbeeldingen['Kloosterman'] = loadImage('Docentenplaatjes/informaticakloosterman.png');
  vijandAfbeeldingen['Speelman'] = loadImage('Docentenplaatjes/informaticaspeelman.png');
  vijandAfbeeldingen['Vanderveen'] = loadImage('Docentenplaatjes/informaticavanderVeen.png');
  vijandAfbeeldingen['Gruber'] = loadImage('Docentenplaatjes/informaticamevrouwGruber.png');
  vijandAfbeeldingen['Brugger'] = loadImage('Docentenplaatjes/informaticaBrugger.png');
  vijandAfbeeldingen['Dries'] = loadImage('Docentenplaatjes/informaticamevrouwDries.png');
  vijandAfbeeldingen['Rugzak'] = loadImage('Docentenplaatjes/informaticarugzak.png');
  beginschermplaatjes['achtergrond'] = loadImage('Docentenplaatjes/augustinusgang.png');
  beginschermplaatjes['Vanderveen'] = loadImage('Docentenplaatjes/vanderveennormaal.png');
  Heroafbeelding = loadImage('Docentenplaatjes/informaticahero.png');
}

function draw() { 
  Spel.teken();
  if(Spel.spelActief) {
    Hero.teken();
  }
}

function keyPressed() {
  if (key === 'k' || key === 'K') {
    Hero.maakOnschendbaar(); // Correcte manier om Hero aan te roepen
  }
}