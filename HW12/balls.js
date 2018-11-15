class Ball {
    constructor(x, y, size) {
        this.color = 'blue';
        this.size = random(10, 40);
        this.rad = this.size / 4;
        this.posX = x;
        this.posY = y;
        this.deltaX = random(-13, 10);
        this.deltaY = random(-5, 15);
    }


    display() {
        push();
        // remove the balls outer stroke
        noStroke();
        // set the balls fill color
        fill(this.color);
        // set the position of the ball
        translate(this.posX, this.posY);
        ellipse(0, 0, this.size);
        pop();
    }

    move() {
        this.posX += this.deltaX;
        this.posY += this.deltaY;
    }

    edgeCheck() {
        // check if the ball has hit a vertical wall (left or right walls)
        if (this.posX + this.rad >= width || this.posX - this.rad <= 0) {
            this.deltaX *= -1;
            this.color = 'green';
        }
        // check if the ball has hit a horizontal wall (top or bottom walls)
        if (this.posY + this.rad >= height || this.posY - this.rad <= 0) {
            this.deltaY *= -1;
            this.color = 'orange';
        }
    }
    ballCheck(otherBalls, MR) {
// for loop touches the BuzzRect
      for (let n = 0; n < otherBalls.length; n++) {
// if n != JX, then check for touching
        if (n != MR) {
        let d = dist(this.posX, this.posY, otherBalls[n].posX, otherBalls[n].posY);
        let combinedR = this.rad + otherBalls[n].rad;

        if (d <= combinedR) {
        this.deltaX *= -1;
        this.deltaY *= -1;


        if( this.color == 'green') {
            this.color = 'orange';
        } else {
            this.color = 'red';
                    }
                }
            }
        }
    }
}
