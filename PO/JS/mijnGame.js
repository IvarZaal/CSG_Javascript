var beginschermplaatjes = {};
var spelachtergrond = {};
var vijandAfbeeldingen = {};
var Heroafbeelding;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('blue');
  textFont("Monospace");
  textSize(40);
  textAlign(CENTER, CENTER);
  frameRate(60);
  spel = new Spel();
  hero = new Hero();
  vijand = new Vijand();
  speelveld = new Speelveld();
  textFont("Arial");
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
  vijandAfbeeldingen['Strikwerda'] = loadImage('Docentenplaatjes/strikwerda.png');
  vijandAfbeeldingen['telefoon'] = loadImage('Docentenplaatjes/telefoon.png');
  vijandAfbeeldingen['bier'] = loadImage('Docentenplaatjes/unepetitbiertjee.png');
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
  eindschermplaatjes = loadImage('Docentenplaatjes/achtergrondeindscherm.png');
}

function draw() {
  spel.teken();
  if (spel.spelActief) {
    hero.teken();
  }
  if (raakt(speelveld.vijanden, hero)) {
    speelveld.spelStoppen();
  }
}

function raakt(vijanden, hero) {
  for (var i = 0; i < speelveld.vijanden.length; i++) {
    var vijand = speelveld.vijanden[i];
    if (hero.invincible) {
      continue;
    }
    var afstand = dist(hero.x, hero.y, vijand.x, vijand.y);
    if (afstand < (hero.grote / 4 + vijand.grote / 4)) {
      if (vijand instanceof VijandBonus1) {
        spel.bonusRaak();
        speelveld.vijanden.splice(i, 1);
        return false;
      }
      if (vijand instanceof VijandBonus2) {
        spel.eersteDinsdagVanDeWeek();
        speelveld.vijanden.splice(i, 1);
        return false;
      }
      return true;
    }
  }
  return false;
}

function keyPressed() {
  if (key === 'k' || key === 'K') {
    hero.maakOnschendbaar();
  }
}
