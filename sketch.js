const SCALE = 15;
var Snake;
var Food;
var start = false;
var score = 0;
var highestScore = 0;

var restart = createGraphics(400, 400);

function setup() {
    background(0);
    createCanvas(450, 450).parent('sketch-div'); // put under sketch div in html
    frameRate(8);
    Snake = new Snake();
    Food = makeValidFood(generateFood());
    // Food = createVector(435, 0);
    document.getElementById("pause").style.display = "none";
}

function draw() {
    background(0);

    //draw food
    printFood(Food);

    // food detection has to come first
    // so that it works with my grow function
    if (Snake.isEat(Food)) {
        Snake.grow();
        Food = makeValidFood(generateFood());

        // add 100 points for eating food 
        score += 100;
        document.getElementsByClassName("score")[0].innerText = "Score:" + " " + score;
    }
    
    // snake moves one step forward automatically when game has started
    if (start == true) {
        Snake.travel();

        // add 1 point for each step
        score++;
        document.getElementsByClassName("score")[0].innerText = "Score:" + " " + score;
    }

    // when you lose the game
    if (isGameOver()) {
        console.log("GAME OVER");
        start = false;
        document.getElementById("play_arrow").style.display = "inline-block";
        document.getElementById("play_arrow").disabled = true;
        document.getElementById("pause").style.display = "none";
        noLoop();
    }

    //draw snake
    Snake.print();

    // check for highest score
    if (score > highestScore) {
        highestScore = score;
        document.getElementsByClassName("highestScore")[0].innerText = "Highest Score:" + " " + highestScore;
    }
}

// function for button "Start Game"
function startGame() {
    start = true;
    document.getElementById("play_arrow").style.display = "none";
    document.getElementById("pause").style.display = "inline-block";
}

// function for button "Pause Game"
function pauseGame() {
    start = false;
    document.getElementById("play_arrow").style.display = "inline-block";
    document.getElementById("pause").style.display = "none";
}

// function for button "Restart"
function newGame() {
    start = false;
    document.getElementById("play_arrow").style.display = "inline-block";
    document.getElementById("play_arrow").disabled = false;
    document.getElementById("pause").style.display = "none";
    
    Snake.reset();
    Food = makeValidFood(generateFood());

    score = 0; // reset score to 0
    document.getElementsByClassName("score")[0].innerText = "Score:" + " " + score;
    loop();
}

// control the direction of the snake
// NOTE: it will ignore the opposite direction keys
// for example, if the snake is moving to the right, and you pressed
// the left arrow key, it will be ignored
function keyPressed() {
    if (start == true) {
        if (keyCode === UP_ARROW) {
            if (Snake.xSpeed != 0 && Snake.ySpeed != 1) {
                Snake.changeDir(0, -1);
            }
        } else if (keyCode === DOWN_ARROW) {
            if (Snake.xSpeed != 0 && Snake.ySpeed != -1) {
                Snake.changeDir(0, 1);
            }
        } else if (keyCode === RIGHT_ARROW) {
            if (Snake.xSpeed != -1 && Snake.ySpeed != 0) {
                Snake.changeDir(1, 0);
            }
        } else if (keyCode === LEFT_ARROW) {
            if (Snake.xSpeed != 1 && Snake.ySpeed != 0) {
                Snake.changeDir(-1, 0);
            }
        }
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
