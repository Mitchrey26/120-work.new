var song;

function preLoad() {
  song = loadSound("Umi.mp3");
}

function setup () {
  createCanvas(200, 200);
  song.play();
}

function draw() {
  background(51);
}
