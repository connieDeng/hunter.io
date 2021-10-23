const Utility = require("./utility")

let stateBoard = Utility.createStateBoard(20,20)

class Game {
    constructor() {
      this.players = new Array(10).fill(0)
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

      let start_cords = Utility.getEmptyCoords(stateBoard);
      start_cords.forEach(element => snake.cords.push(element));
      start_cords.forEach(element => {
        console.log(element[0], element[1])
        stateBoard[element[0]][element[1]] = id;
      });
      console.log("snake " + snake.id + " coordinates are: " + snake.cords);
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
    console.log("in move, previous cords", this.cords)
    // up
    if (this.dir == "up"){
      let move_cord = this.cords.pop()
      stateBoard[move_cord[0]][move_cord[1]] = -1;
      console.log(this.cords[0][0]-1, this.cords[0][1])
      this.cords.unshift([this.cords[0][0]-1, this.cords[0][1]])
      stateBoard[this.cords[0][0]][this.cords[0][1]] = '0';
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
    console.log(this.cords)

    console.log("updated state board")
    console.table(stateBoard)
  }
  
}

game = new Game()
// let bot1 = game.createSnake("bot")
// game.addSnake(bot1)
let bot2 = game.createSnake("bot")
game.addSnake(bot2)
// let bot3 = game.createSnake("bot")
// game.addSnake(bot3)
bot2.move("up")
bot2.move("up")
// bot2.move("up")
module.exports = Game;