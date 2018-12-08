var inc = .1;
var scl = 10;
var cols, rows;
var zoff = 0;
var particle = [];
var flowfield = [];
var song;
var amp;
var volhistory = [];

function preload() {
  song = loadSound('VULFPECK.mp3');
}

function setup () {

  createCanvas(1000, 600);
  cols = floor(width / scl);
  rows = floor(height / scl);

  song.play();
  amp = new p5.Amplitude();

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 2500; i++){
    particle[i] = new Particle();


  }

fft = new p5.FFT();

background('255');
}


function draw() {

  blendMode(BLEND);
  angleMode(DEGREES);

  fft.analyze();

  var bass = fft.getEnergy("bass");
  var treble = fft.getEnergy("treble");
  var lowMid = fft.getEnergy("lowMid");
  var mid = fft.getEnergy("mid");
  var highMid = fft.getEnergy("highMid");
  var centriod = fft.getCentroid("centriod");
  bass = map(bass, 0, 300, 0, -360);
  treble = map(treble, 0, 250, 0, -360);
  lowMid = map(lowMid, 0, 250, 0, -360);
  mid = map(mid, 0, 250, 0, -360);
  highMid = map(highMid, 0, 200, 0, -360);
  centriod = map(centriod, 40, 10000, 0, -360);

  push();

  noStroke();
  fill('blue');
  arc(width/1.2, height/4, 200, 200, bass, HALF_PI);

  fill('orange')
  arc(width/1.2, height/4, 275, 275, centriod, HALF_PI)

  fill('green');
  arc(width/1.2, height/4, 180, 180, mid, HALF_PI);

  fill('red');
  arc(width/1.2, height/4, 60, 60, treble, HALF_PI);
  pop();


  noStroke();

  //fill(230, 23, 0);
  //arc(width / 5, height / 4, 300, 300, centriod, HALF_PI);

//  fill(255, 130, 5);
//  arc(width / 5, height / 4, 250, 250, bass, HALF_PI);

  fill(242, 223, 0);
  arc(width / 5, height / 4, 200, 200, lowMid, HALF_PI);

  fill(92, 243, 51);
  arc(width / 5, height / 4, 150, 150, mid, HALF_PI);

  fill(42, 214, 240);
  arc(width / 5, height / 4, 100, 100, highMid, HALF_PI);

  fill(124, 68, 230);
  arc(width / 5, height / 4, 50, 50, treble, HALF_PI);

  push();
  fill(255, 50);
  strokeWeight(5);

  noStroke();

  //fill(230, 23, 0);
  //arc(width / 5, height / 4, 300, 300, centriod, HALF_PI);

//  fill(255, 130, 5);
//  arc(width / 5, height / 4, 250, 250, bass, HALF_PI);

  fill(119,136,153);
  arc(width / 2, height / 1.7, 400, 400, lowMid, HALF_PI);

  fill(255,160,122);
  arc(width / 2, height / 1.7, 350, 350, bass, HALF_PI);

  fill(32,178,170);
  arc(width / 2, height / 1.7, 300, 300, mid, HALF_PI);

  fill(119,136,153);
  arc(width / 2, height / 1.7, 250, 250, lowMid, HALF_PI);

  fill(218,165,32);
  arc(width / 2, height / 1.7, 200, 200, highMid, HALF_PI);

  fill(32,178,170);
  arc(width / 2, height / 1.7, 150, 150, mid, HALF_PI);

  fill(255,160,122);
  arc(width / 2, height / 1.7, 100, 100, treble, HALF_PI);

  fill(218,165,32);
  arc(width / 2, height / 1.7, 50, 50, bass, HALF_PI);

  push();
  fill(255, 50);
  strokeWeight(5);




  var yoff = 0;

  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for(var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(.8);
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
