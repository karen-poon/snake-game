const SCALE = 15;
var Snake;
var Food;
var start = false;

function setup() {
    createCanvas(450, 450);
    frameRate(5);
    Snake = new Snake();
    Food = makeValidFood(generateFood());
}

function draw() {
    background(0);

    if (start == true) {
        Snake.travel();
    }

    if (isGameOver()) {
        console.log("GAME OVER");
        start = false;
        noLoop();
    }

    if (Snake.isEat(Food)) {
        Snake.grow();
        Food = makeValidFood(generateFood());
    }
    
    Snake.print();
    
    //draw food
    fill(255, 0, 100);
    rect(Food.x, Food.y, SCALE, SCALE);
}

// function for button "Start Game"
function startGame() {
    start = true;
}

// function for button "Restart"
function newGame() {
    Snake.reset();
    Food = makeValidFood(generateFood());
    loop();
}

// control the direction of the snake
function keyPressed() {
    if (keyCode === UP_ARROW) {
        Snake.changeDir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        Snake.changeDir(0, 1);
    } else if (keyCode === RIGHT_ARROW) {
        Snake.changeDir(1, 0);
    } else if (keyCode === LEFT_ARROW) {
        Snake.changeDir(-1, 0);
    }
}

// check for game over
function isGameOver() {
    // when it's out of border
    if (Snake.head.x < 0 || Snake.head.y < 0 || Snake.head.x > width-SCALE || Snake.head.y > height-SCALE) {
        return true;
    }

    // when it eats itself
    for (i = 0; i < Snake.body.length; i++) {
        if (Snake.head.equals(Snake.body[i])) {
            return true;
        }
    }
    return false;
}
