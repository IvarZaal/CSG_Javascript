var beginschermplaatjes = {};
var spelachtergrond = {};
var vijandAfbeeldingen = {};
var Heroafbeelding

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


// preload-functie
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
  spelachtergrond['level 1'] = loadImage('Docentenplaatjes/achtergrondlevel1.png');
  spelachtergrond['level 2'] = loadImage('Docentenplaatjes/achtergrondlevel2.png');
  spelachtergrond['level 3'] = loadImage('Docentenplaatjes/achtergrondlevel3.png');
  Heroafbeelding = loadImage('Docentenplaatjes/informaticahero.png');
  achtergrondmuziek['muziek2'] = loadSound("sounds/Muziek2.mp3");
  achtergrondmuziek['muziek3'] = loadSound("sounds/Muziek3.mp3");
  achtergrondmuziek['muziek1'] = loadSound("sounds/Muziek1.mp3");
  eindschermplaatjes = loadImage('Docentenplaatjes/achtergrondeindscherm.png')
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