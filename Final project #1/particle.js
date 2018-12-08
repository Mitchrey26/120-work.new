


function Particle (){
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 3;

  this.prevPos = this.pos.copy();

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  //lets the particles follow vectors
this.follow = function(vectors) {
  var x = floor(this.pos.x / scl);
  var y = floor(this.pos.y / scl);
  var index = x + y * cols;
  var force = vectors[index];
  this.applyForce(force);
}
//how fast the particles travel
  this.applyForce = function(force) {
    this.acc.add(force);
  }


//color position and path of where the particles will go.
  this.show = function() {
    stroke(51, 5);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
    //point(this.pos.x, this.pos.y);
  }

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }


//if a praticle reaches an edge it will pop out on the otherside that way no
//paritcles will dissapear
this.edges = function() {
  if (this.pos.x > width) {
    this.pos.x = 0;
    this.updatePrev();
  }
  if (this.pos.x < 0) {
    this.pos.x = width;
    this.updatePrev();
  }
  if (this.pos.y > height) {
    this.pos.y = 0;
    this.updatePrev();
  }
  if (this.pos.y < 0){
     this.pos.y = height;
     this.updatePrev();
  }
}

}
