const Utility = require("./utility")

let stateBoard = Utility.createStateBoard(20,20)
let playerIDs = Utility.createDict(10);
let players = {}
let numApples = 0;
let numPlayers = 0;

class Game {
    constructor() {
      console.log("Made a game")
    }
    
    createSnake(SOCKET_ID){
      let id = Utility.getRandomId(playerIDs);
      let snake = new Snake(id, SOCKET_ID);
      return snake
    }

    addSnake(snake){
      console.log("adding snake with id " + snake.id)
      let id = snake.id;
      playerIDs[id] = snake;
      players[snake.socket_id] = snake;

      let start_cords = Utility.getEmptyCoordsforSnake(stateBoard);
      snake.cords.push(start_cords)
      // we are assuming each snake is 2 pixels (head and body)
      snake.cords.push([start_cords[0]+1, start_cords[1]])
      snake.cords.forEach(element => {
        stateBoard[element[0]][element[1]] = id;
      });
    }

    addApple(){
      let apple_cords = Utility.getEmptyCoordsforApple(stateBoard);
      stateBoard[apple_cords[0]][apple_cords[1]] = 'A';
      numApples += 1
    }

}

// GENERAL SNAKE
class Snake extends Game {
  constructor(ID, SOCKET_ID) {
      super(ID, SOCKET_ID);
      this.id = ID;
      this.socket_id = SOCKET_ID;
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
    // console.log(this.dir)
  }

  change_direction(event) {  
    const keyPressed = event;
    const goingUp = this.dx === -1;
    const goingDown = this.dx === 1;
    const goingRight = this.dy === 1;  
    const goingLeft = this.dy=== -1;

    // console.log(keyPressed)
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
    // console.log([head_cord, stateBoard[head_cord[0]][head_cord[1]], stateBoard[head_cord[0]][head_cord[1]]=== 'A']);
    let x = head_cord[1];
    let y = head_cord[0];
    // if out of bounds
    if (x < 0 || y < 0 || x > stateBoard.length || y > stateBoard.length || stateBoard[x][y] !== -1) {
      process.exit();
    } else if (stateBoard[head_cord[0]][head_cord[1]]=== 'A'){
      return 'apple';
    } 
    
  }

  /*
  MOVING FORWARD
  // moves are: up,down,left,right && turnUp,turnDown,turnLeft,turnRight
  move() {
    let head = [this.cords[0][0] + this.dx, this.cords[0][1] + this.dy]
    this.cords.unshift(head);
    if(this.ifCollision(head) === 'apple'){
      this.score += 10;
      let old = this.cords[this.cords.length-1];
      stateBoard[old[0]][old[1]] = this.id;
      game.addApple();
    } else {
      let old = this.cords.pop();
      stateBoard[old[0]][old[1]] = -1;
    }
    stateBoard[this.cords[0][0]][this.cords[0][1]] = this.id;
  }
  */

  move() {
    let head = [this.cords[0][0] + this.dx, this.cords[0][1] + this.dy]
    this.cords.unshift(head);
    if(this.ifCollision(head) === 'apple'){
      this.score += 10;
      let old = this.cords[this.cords.length-1];
      stateBoard[old[0]][old[1]] = this.id;
      game.addApple();
    } else {
      let old = this.cords.pop();
      stateBoard[old[0]][old[1]] = -1;
    }
    stateBoard[this.cords[0][0]][this.cords[0][1]] = this.id;
  }


  destroy(){
    this.cords.forEach(element => {
      stateBoard[element[0]][element[1]] = -1
    });

    playerIDs[this.id] = null;
    delete players[this.socket_id];
  }
}

// driver code here
// const readline = require('readline');
// readline.emitKeypressEvents(process.stdin);
// process.stdin.setRawMode(true);


// function main (){
//   // create new game
//   game = new Game()

//   // create and include one snake
//   let bot1 = game.createSnake("bot")
//   game.addSnake(bot1)

//   // let bot2 = game.createSnake("bot")
//   // game.addSnake(bot2)
  
//   // generate food
//   game.addApple()
  
//   start_game();
  
//   process.stdin.on('keypress', (str, key) => {
//     if (key.ctrl && key.name === 'c') {
//       process.exit();
//     } else {
//       console.log("You pressed the", key.name, "key");
//       bot1.change_direction(key.name)
//       // bot2.change_direction(key.name)
//     }
//   });

//   function start_game() {
//     timeout = setTimeout(function onTick() {
//       console.clear();
//       bot1.move();
//       // bot2.move();
//       start_game();
//     }, 300)
//   }
// }


// main();

// console.table(stateBoard)
module.exports = { Game, Snake, stateBoard, numApples, numPlayers, players, playerIDs};