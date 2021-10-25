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
        // console.log(element[0], element[1])
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

  set_direction(newDir) {
    this.dir = newDir
    console.log(this.dir)
  }

  move() {
    console.log("currently direction:", this.dir, "; in move, previous cords: ", this.cords)
    // console.table(stateBoard)
    // up
    let newCords = [0,0]
    if (this.dir == "up"){
      let move_cord = this.cords.pop()
      stateBoard[move_cord[0]][move_cord[1]] = -1;
      //[0][0] is the front of the snake; -1 front of it
      newCords = [this.cords[0][0]-1, this.cords[0][1]]
      this.cords.unshift([newCords[0], newCords[1]])
      console.log(this.cords)
      console.log("moved up")
    } 
    // down
    else if (this.dir == "down"){
      let move_cord = this.cords.shift();
      stateBoard[move_cord[0]][move_cord[1]] = -1;
      newCords = [this.cords[0][0]+1, this.cords[0][1]]
      this.cords.push([newCords[0], newCords[1]])
      console.log("moved down")
      console.log(this.cords)
    } 
    // left
    else if (this.dir == "left"){
      let move_cord = this.cords.pop()
      stateBoard[move_cord[0]][move_cord[1]-1] = -1;
      newCords = [this.cords[0][0], this.cords[0][1]-1]
      this.cords.unshift([newCords[0], newCords[1]])
      console.log("moved left")
      console.log(this.cords)
    } 
    // right
    else {
      let move_cord = this.cords.pop()
      stateBoard[move_cord[0]][move_cord[1]+1] = -1;
      newCords = [this.cords[0][0], this.cords[0][1]+1]
      this.cords.unshift([newCords[0], newCords[1]])
      console.log("moved right")
      console.log(this.cords)
    }
    stateBoard[newCords[0]][newCords[1]] = this.id;
    console.table(stateBoard)
  }
  
}

game = new Game()
let bot1 = game.createSnake("bot")
game.addSnake(bot1)
// bot1.move()
bot1.set_direction("down")
bot1.move()
// bot1.move()
// bot2.move("up")
module.exports = Game;