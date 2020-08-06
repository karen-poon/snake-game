function Snake() {
    this.head = createVector(60, 0);
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.body = []; // body does not include the head
    this.len = 4; // length of body

    // initialize the snake with some body
    this.body.push(createVector(0, 0));
    this.body.push(createVector(15, 0));
    this.body.push(createVector(30, 0));
    this.body.push(createVector(45, 0));

    /************************ FUNCTIONS ************************/
    // snake travels automatically
    this.travel = function() {
        // move body
        for (let i = 0; i < this.len-1; i++) {
            this.body[i] = this.body[i+1];
        }
        this.body[this.len-1] = createVector(this.head.x, this.head.y);

        // move head
        this.head.x += this.xSpeed * SCALE;
        this.head.y += this.ySpeed * SCALE;
    }

    // increase body size after eating food
    this.grow = function() {
        this.body[this.len] = createVector(this.head.x, this.head.y);
        this.head.x += this.xSpeed * SCALE;
        this.head.y += this.ySpeed * SCALE;
        this.len++;
    }

    // change snake moving direction
    this.changeDir = function(xdir, ydir) {
        this.xSpeed = xdir;
        this.ySpeed = ydir;
    }
    
    // detects whether snake successfully eats a food
    this.isEat = function(food_pos) {
        if (this.head.x == food_pos.x && this.head.y == food_pos.y) {
            return true;
        }
        return false;
    }

    // print the snake
    this.print = function () {
        fill(255);
        noStroke();
        for (let i = 0; i < this.len; i++) {
            rect(this.body[i].x, this.body[i].y, SCALE, SCALE, 4);
        }
        rect(this.head.x, this.head.y, SCALE, SCALE, 4);
    }

    // resets back to the beginning position
    this.reset = function () {
        this.head = createVector(60, 0);
        this.xSpeed = 1;
        this.ySpeed = 0;
        this.body = [];
        this.len = 4; // length of body

        // initialize the snake with some body
        this.body.push(createVector(0, 0));
        this.body.push(createVector(15, 0));
        this.body.push(createVector(30, 0));
        this.body.push(createVector(45, 0));

    }
    /***********************************************************/
}
