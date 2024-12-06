
class speelveld {
  constructor(l) {
      this.x = windowWith/4;
      this.y = 0;
      this.groote = windowWith/2; 
      this.kleur = 'red';

  }
  tekenBeginscherm() {
      push();
      noStroke();
      fill(this.kleur);
      rect(this.x,this.y,this.d);
      pop();
  }
}

