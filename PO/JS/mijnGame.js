

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('blue');
  textFont("Monospace");
  textSize(40);
  textAlign(CENTER, CENTER);
  frameRate(60);
  spel = new Spel()
  hero = new Hero()
  vijand = new Vijand()
  speelveld = new Speelveld
}

function preload() {
  vijandAfbeeldingen['Kloosterman'] = loadImage('Docentenplaatjes/informaticakloosterman.png');
  vijandAfbeeldingen['Speelman'] = loadImage('Docentenplaatjes/informaticaspeelman.png');
  vijandAfbeeldingen['Vanderveen'] = loadImage('Docentenplaatjes/informaticavanderVeen.png');
  vijandAfbeeldingen['Gruber'] = loadImage('Docentenplaatjes/informaticamevrouwGruber.png');
  vijandAfbeeldingen['Brugger'] = loadImage('Docentenplaatjes/informaticaBrugger.png');
  vijandAfbeeldingen['Dries'] = loadImage('Docentenplaatjes/informaticamevrouwDries.png');
  vijandAfbeeldingen['Rugzak'] = loadImage('Docentenplaatjes/informaticabruggerrugzak.png');
  vijandAfbeeldingen['Stoel'] = loadImage('Docentenplaatjes/informaticastoel.png');
  beginschermplaatjes['achtergrond'] = loadImage('Docentenplaatjes/augustinusgang.png');
  beginschermplaatjes['Vanderveen'] = loadImage('Docentenplaatjes/vanderveennormaal.png');
  beginschermplaatjes['Schadenberg'] = loadImage('Docentenplaatjes/informaticaSchadenberg.png');
  beginschermplaatjes['kloosterman'] = loadImage('Docentenplaatjes/kloostermanschuin.png');
  spelachtergrond['level 1'] = loadImage('Docentenplaatjes/achtergrondlevel1.png')
  Heroafbeelding = loadImage('Docentenplaatjes/informaticahero.png');
}

function draw() { 
  spel.teken();
  if(spel.spelActief) {
    hero.teken();
  }
}

function keyPressed() {
  if (key === 'k' || key === 'K') {
    hero.maakOnschendbaar(); // Correcte manier om Hero aan te roepen
  }
}