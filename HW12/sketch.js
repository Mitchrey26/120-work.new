let balls = [];
const numOfBalls = 80;


function setup() {
    // createCanvas(windowWidth, windowHeight);
    createCanvas(windowWidth, windowHeight);
      // creates our new ball object
    let init_x = 40;
    let init_y = 80;
    for ( let i = 0; i < numOfBalls; i++ ) {
        balls.push( new Ball( init_x, init_y ) );
        //maves starting position so things aren't on top of eachother
        init_x += 100;
        if( init_x > width ) {
            init_x = 60;
            init_y += 100;
        }
    }

}

function draw() {
    background( 'pink' );

    for (let i = 0; i < balls.length; i++) {
        //identify ball's methods
        balls[i].move();
        balls[i].edgeCheck();
        balls[i].display();
        balls[i].ballCheck(balls, i);
    }
}
