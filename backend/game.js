const Utility = require("./utility")

// LOGIC FOR GAME
class Game {
    constructor() {
      this.players = new Array(10).fill(0)
      this.stateBoard = []
    }
    
    // createSnake(type){
    //   let id = Utility.getRandomId(this.players)
    //   console.log("ID given to new snake: " + id)
    //   if(type === "bot"){
    //     let snake = new Snake.Bot_Snake(id, 'test');
    //     snake.show()
    //   } else {
    //     let snake = new Snake.User_Snake(id, 'test');
    //   }
    // }

}

// GENERAL SNAKE
class Snake extends Game {
  constructor(ID) {
      super(ID);
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
// BOT SNAKE
class Bot_snake extends Snake {
  constructor(ID, TEST) {
    super(ID);
    this.test = TEST
  }

  show() {
    console.log(this.id + ' following message: ' + this.test) ;
  }
}

// USER SNAKE
class User_snake extends Snake {
  constructor(ID) {
    super(ID);
  }
}


game = new Game()

bot1 = new Bot_snake(1, 'test');
bot1.show()

module.exports = Game;