const Utility = require("./utility")

// LOGIC FOR GAME
class Game {
    constructor() {
      this.players = new Array(10).fill(0)
      this.stateBoard = Utility.createStateBoard(20,20)
    }
    
    createSnake(type){
      let id = Utility.getRandomId(this.players)
      let snake = null
      if(type === "bot"){
        console.log("Creating Bot Snake with ID: " + id)
        snake = new Snake(id, 'bot Snake');
      } else {
        console.log("Creating User Snake with ID: " + id)
        snake = new Snake(id, 'user Snake');
      }
      return snake
    }

    addSnake(snake){
      console.log("adding snake with id " + snake.id)
      let id = snake.id;
      this.players[id] = snake;

      let start_cords = Utility.getEmptyCoords(this.stateBoard);
      start_cords.forEach(element => snake.cords.push(element));
      start_cords.forEach(element => {
        console.log(element[0], element[1])
        this.stateBoard[element[0]][element[1]] = id;
      });
      console.log("snake " + snake.id + " coordinates are: " + snake.cords);
      console.table(this.stateBoard)
    }

}

// GENERAL SNAKE
class Snake extends Game {
  constructor(ID) {
      super(ID);
      this.id = ID ;
      this.speed = 1;
      this.cords = [];
      this.dir = 'up';

  }

  set set_direction(newDir) {
      this.direction = newDir
  }

  move() {
    // up
    if (this.dir == "up"){
      this.cords.forEach(element => {
        element[0] += 1
        console.log(element)
        // this.stateBoard[element[0]][element[1]] = id;
      });
    } 
    // down
    else if (this.dir == "down"){
      this.cords.forEach(element => {
        console.log(element)
      });
    } 
    // left
    else if (this.dir == "left"){
      this.cords.forEach(element => {
        console.log(element)
      });
    } 
    // right
    else {
      this.cords.forEach(element => {
        console.log(element)
      });
    }
  }
  
}

game = new Game()
let bot1 = game.createSnake("bot")
game.addSnake(bot1)
let bot2 = game.createSnake("bot")
game.addSnake(bot2)
bot2.move("up")
module.exports = Game;