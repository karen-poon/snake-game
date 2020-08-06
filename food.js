// generate food at a random position
// NOTE: can generate at the snake's head or body
// NOTE: MUST CALL makeValidFood() to validate its position
function generateFood() {
    let x = floor(width / SCALE);
    let y = floor(height / SCALE);

    let food_pos_x = floor(random(x))*SCALE;
    let food_pos_y = floor(random(y))*SCALE;

    return createVector(food_pos_x, food_pos_y);
}

// make sure the Food generated is valid
// meaning it will NOT be generated at the snake's head or body
function makeValidFood(food) {
    let validFood = false;
    do {
        if (food.equals(Snake.head)) {
            food = generateFood();
            continue;
        }

        var i;
        for (i = 0; i < Snake.body.length; i++) {
            if (food.equals(Snake.body[i])) {
                food = generateFood();
                break;
            }
        }
        if (i == Snake.body.length) {
            validFood = true;
        }

    } while (validFood == false);

    return food;
}

function printFood(food) {
    fill(255, 0, 100);
    ellipse(food.x+SCALE/2, food.y+SCALE/2, SCALE-2);
}
