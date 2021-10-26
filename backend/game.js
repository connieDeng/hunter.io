const Utility = require("./utility")

let stateBoard = Utility.createStateBoard(20,20)

class Game {
    constructor() {
      this.players = Utility.createDict(10);
      // do we need this? I think we only need to handle how many apples on the board
      // this.apples = Utility.createDict(10)
      this.numApples = 0;
      this.gameStart = false;
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
      snake.cords.push(start_cords)
      // we are assuming each snake is 2 pixels (head and body)
      snake.cords.push([start_cords[0]+1, start_cords[1]])
      snake.cords.forEach(element => {
        stateBoard[element[0]][element[1]] = id;
      });
      console.log("snake " + snake.id + " coordinates are: " + snake.cords);
    }

    addApple(){
      let apple_cords = Utility.getEmptyCoords(stateBoard);
      stateBoard[apple_cords[0]][apple_cords[1]] = 'A';
      this.numApples += 1
    }

 
}

// GENERAL SNAKE
class Snake extends Game {
  constructor(ID) {
      super(ID);
      this.id = ID ;
      this.speed = 1;
      this.cords = [];
      this.score = 0;

      // default moving up
      //vertical
      this.dx = -1;
      //horizontal
      this.dy = 0;
  }

  set_direction(newDir) {
    this.dir = newDir
    console.log(this.dir)
  }

  change_direction(event) {  
    console.log('DX IS: ', this.dx, 'DY IS: ', this.dy)
    const keyPressed = event;
    const goingUp = this.dx === -1;
    const goingDown = this.dx === 1;
    const goingRight = this.dy === 1;  
    const goingLeft = this.dy=== -1;

    console.log(keyPressed)
    if (keyPressed === "left" && !goingRight){    
      this.dx = 0;
      this.dy = -1;  
    }

    if (keyPressed === "up" && !goingDown){    
      this.dx = -1;
      this.dy = 0;
    }

    if (keyPressed === "right" && !goingLeft){    
      this.dx = 0;
      this.dy = 1;
    }

    if (keyPressed === "down" && !goingUp){    
      this.dx = 1;
      this.dy = 0;
    }
  }

  ifCollision(head_cord){
    let y = head_cord[0];
    let x = head_cord[1]
   
    if (x <= 0 || y <= 0 || x > stateBoard.length || y > stateBoard.length || stateBoard[x][y] !== -1){
      return true
    } else if (stateBoard[x][y] === 'A'){
      return 'apple'
    } else {
      return 'collided with another snake'
    }
    
  }

  // moves are: up,down,left,right && turnUp,turnDown,turnLeft,turnRight
  move() {
    let head = [this.cords[0][0] + this.dx, this.cords[0][1] + this.dy]
    if(this.ifCollision(head) === true){
      this.dx = 0;
      this.dy = 0;
      // delete the snake
      process.exit()
    } else {
      if(this.ifCollision(head) === 'apple'){
        this.score += 10;
      }
      this.cords.unshift(head);
      stateBoard[this.cords[0][0]][this.cords[0][1]] = this.id;
      let old = this.cords.pop();
      stateBoard[old[0]][old[1]] = -1;
      console.log(this.score)
      console.table(stateBoard)
    }
  }
}

// driver code here
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);


function main (){
  game = new Game()
  let bot1 = game.createSnake("bot")
  game.addSnake(bot1)
  game.addApple()
  
  start_game();
  
  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.exit();
    } else {
      console.log("You pressed the", key.name, "key");
      bot1.change_direction(key.name)
    }
  });

  function start_game() {
    timeout = setTimeout(function onTick() {
      console.clear();
      bot1.move();
      start_game();
    }, 500)
  }
}


main();

// console.table(stateBoard)
module.exports = Game;