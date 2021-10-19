//import { findNextStep } from "./snake-movement";
const constant = require("./constants")

//user_snake(SNAKE_START)


class user_snake {
    constructor(ID,player_count) {
        this.id = ID 
        this.start = constant.SNAKE_START
        this.speed = constant.SPEED
        this.direction = constant.DIRECTIONS
        this.number = player_count
        this.body = constant.SNAKE_START
    }

    set set_direction(newDir) {
        this.direction = newDir
    }

    set set_player_number(count){
        this.number = count
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

module.exports = {
    user_snake
}