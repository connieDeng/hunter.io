// const constant = require("./constants")
// const Game = require("./game");

class Snake {
    constructor(ID) {
        this.id = ID 
        this.start = 38
        this.speed = 1
        // this.direction = constant.DIRECTIONS
        // this.number = player_count
        // this.body = constant.SNAKE_START
    }

    get get_direction() {
      return this.direction
    }

    get get_id() {
      return this.id
    }

    set set_direction(newDir) {
        this.direction = newDir
    }
    
}

class User_snake extends Snake {
  constructor(ID) {
    super(ID);
  }
}

class Bot_snake extends Snake {
  constructor(ID, TEST) {
    super(ID);
    this.test = TEST
  }
}

bot1 = new Bot_snake(1, 'test');
bot1.show()
// console.log(bot1.get_id)

module.exports = {Snake , Bot_snake};
