const Utility = require("./utility")

let stateBoard = Utility.createStateBoard(20,20);
let playerIDs = Utility.createDict(10);
let players = {};
let numPlayers = 0;
let apples = {};

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

    addApple(socket){
      let apple_cords = Utility.getEmptyCoordsforApple(stateBoard);
      // console.log("apple coords", apple_cords)
      stateBoard[apple_cords[0]][apple_cords[1]] = 'A';
      apples[[apple_cords[0], apple_cords[1]]] = [apple_cords[0], apple_cords[1]];
      // console.log(apples)
      socket.emit("updatedStateBoard", stateBoard);
      socket.broadcast.emit("updatedStateBoard", stateBoard)
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
      this.nickname='test';
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
    let x = head_cord[1];
    let y = head_cord[0];
    // console.log(x,y)
    // if out of bounds
    if (x < 0 || y < 0 || x >= stateBoard[0].length || y >= stateBoard.length) {
      console.log('boundary hit')
      return 'bounds';
    } else if (stateBoard[head_cord[0]][head_cord[1]] === 'A'){
      return 'apple';
    } else if (stateBoard[head_cord[0]][head_cord[1]] !== -1){
      console.log("body hit")
      return 'snake';
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

  move(GAME, socket) {
    // console.log('test', socket)
    let head = [this.cords[0][0] + this.dx, this.cords[0][1] + this.dy]
    
    if(this.ifCollision(head) === 'bounds' || this.ifCollision(head) === 'snake'){
      this.destroy();
    } else {
      this.cords.unshift(head);
      if (this.ifCollision(head) === 'apple'){
        let appleToDelete = Object.values(apples)[0];
        let stringKey = String(appleToDelete[0]) + ',' + String(appleToDelete[1])
        delete apples[stringKey];

        GAME.addApple(socket);
        this.score += 10;
        players[socket.id].score = this.score;
        players[socket.id].nickname = this.nickname;
        
        socket.emit("updatePlayers", Utility.sortOnVals(players));
        socket.broadcast.emit("updatePlayers", Utility.sortOnVals(players))
  
        let old = this.cords[this.cords.length-1];
        stateBoard[old[0]][old[1]] = this.id;
      } else {
        let old = this.cords.pop();
        stateBoard[old[0]][old[1]] = -1;
      }
      stateBoard[this.cords[0][0]][this.cords[0][1]] = this.id;
    }
  }

  destroy(){
    console.log("destroy in game")
    this.cords.forEach(element => {
      stateBoard[element[0]][element[1]] = -1
    });

    // ridding of apple 
    let appleToDelete = Object.values(apples)[0];
    stateBoard[appleToDelete[0]][appleToDelete[1]] = -1;
    let stringKey = String(appleToDelete[0]) + ',' + String(appleToDelete[1]);
    delete apples[stringKey];
    
    playerIDs[this.id] = null;
    delete players[this.socket_id];
  }
}
module.exports = { Game, Snake, stateBoard, numPlayers, players, playerIDs};