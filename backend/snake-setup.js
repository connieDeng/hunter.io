module.exports = {
    user_snake,
}

import { findNextStep } from "./snake-movement";
import {
    DIRECTIONS,

  } from "./constants";

//user_snake(SNAKE_START)


class user_snake {
    constructor(SNAKE_START, SPEED, DIRECTIONS) {
        this.start = SNAKE_START
        this.speed = SPEED
        this.direction = DIRECTIONS

        this.body = SNAKE_START
    }

    set set_direction(newDir) {
        this.direction = newDir
    }

    get get_direction() {
        return this.direction
    }
      
    moveSnake( keyCode ) {
        keyCode >= 37 && keyCode <= 40 && set_direction(DIRECTIONS[keyCode]);
        let newSnakeHead = [this.body[0][0] + this.direction[0], this.body[0][1] + this.direction[1]];
        this.body.unshift(newSnakeHead)
    }


}