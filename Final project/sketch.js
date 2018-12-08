var song;
var inc = .1;
var scl = 10;
var cols, rows;
var zoff = 0;
var particle = [];
var flowfield = [];


function preload() {
  song = loadSound("Doorbell-sound-effect.mp3");
}

function setup () {
  createCanvas(1000, 600);
  song.play();
  cols = floor(width / scl);
  rows = floor(height / scl);

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 1000; i++){
    particle[i] = new Particle();

  }
background(255);
}


function draw() {

  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for(var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(.08);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 100);
      //push();
      //translate(x * scl, y * scl);
      //rotate(v.heading());
      //strokeWeight(1);
      //line(0, 0, scl, 0);

      //pop();
    }
    yoff += inc;

    zoff += 0.0004;
  }
  for (var i = 0; i < particle.length; i++) {
    particle[i].follow(flowfield);
    particle[i].update();
    particle[i].edges();
    particle[i].show();

  }
}
