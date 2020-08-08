const SCALE = 15;
var Snake;
var Food;
var SpecialFood;
var start = false;
var score = 0;
var highestScore = 0;
var timer = 5;

function setup() {
    background(0);
    createCanvas(450, 450).parent('sketch-div'); // put under sketch div in html
    frameRate(8);
    
    Snake = new Snake();
    Food = makeValidFood(generateFood());
    SpecialFood = makeValidFood(generateFood());
    
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

    // unlock special food once score reaches 1000
    if (score > 1000) {
        document.getElementsByTagName("canvas")[0].style.border = "solid 10px rgb(122, 173, 44)";
        document.getElementById("sketch-div").style.padding = "0px";
        document.getElementsByClassName("info")[0].innerHTML = "2nd Stage";

        // draw special food
        printSpecialFood(SpecialFood);

        // countdown (do not countdown when paused or game is over)
        if (frameCount % 10 == 0 && timer > 0 && start == true) {
            timer--;
        } 
        // reset timer and regenerate special food position
        if (frameCount % 10 == 0 && timer == 0) {
            timer = 5; // reset timer
            SpecialFood = makeValidFood(generateFood()); // reset position
        }
        // when snake eats the speical food
        if (Snake.isEat(SpecialFood)) {
            Snake.grow();
            timer = 5; // reset timer
            SpecialFood = makeValidFood(generateFood()); // reset position

            // add 300 points for eating special food 
            score += 300;
            document.getElementsByClassName("score")[0].innerText = "Score:" + " " + score;
        }
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
        document.getElementsByClassName("info")[0].innerHTML = "GAME OVER";
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

/************************ FUNCTIONS ************************/
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
    SpecialFood = makeValidFood(generateFood());
    
    // reset timer
    timer = 5; 
    
    // reset score
    score = 0; 
    document.getElementsByClassName("score")[0].innerText = "Score:" + " " + score;

    // reset canvas border
    document.getElementsByTagName("canvas")[0].style.border = "none";
    document.getElementById("sketch-div").style.padding = "10px";

    // reset stage
    document.getElementsByClassName("info")[0].innerHTML = "1st Stage";
    
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
    // when it eats itself
    for (i = 0; i < Snake.body.length; i++) {
        if (Snake.head.equals(Snake.body[i])) {
            return true;
        }
    }
    
    return false;
}
