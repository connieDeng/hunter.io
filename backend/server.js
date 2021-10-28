const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const Game = require('./game');
const Utility = require('./utility');
const { connect } = require("http2");
//----------------------------------------- END OF IMPORTS---------------------------------------------------
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

//SOCKET.IO 
//connection class
var GAME = new Game.Game();

io.on("connection", (socket) => {// Listens for client for connection and disconnection
  console.log("User connected: " + socket.id);
  
  socket.on("initPlayer", () => {//returns player obj, otherwise makes new player and increment count
    SNAKE = GAME.createSnake(socket.id);
    GAME.addSnake(SNAKE);
    Game.numPlayers += 1;
    // console.log(SNAKE);
    socket.emit("updatePlayers", Utility.sortOnVals(Game.players));
    socket.broadcast.emit("updatePlayers", Utility.sortOnVals(Game.players));

    GAME.addApple(socket)
    socket.emit("updatedStateBoard", Game.stateBoard);
    socket.broadcast.emit("updatedStateBoard", Game.stateBoard);

    // socket.emit("updatedStateBoard", Game.stateBoard);
    // socket.broadcast.emit("updatedStateBoard", Game.stateBoard);
    // console.table(Game.stateBoard);
  });

  socket.on("moveSnake", (dir) => {
    snake_to_move = Utility.returnSnake(socket.id, Game.players);
    if(snake_to_move === undefined){
      console.log("Game Over")
    }
    else{
      snake_to_move.change_direction(dir)
      // console.log("socket in server", socket.id)
      snake_to_move.move(GAME, socket)
      // console.table(Game.stateBoard);
      socket.emit("updatedStateBoard", Game.stateBoard);
      socket.broadcast.emit("updatedStateBoard", Game.stateBoard);
    }
    
  });

  socket.on("disconnect", () => {  
    if(Utility.returnSnake(socket.id, Game.players) !== undefined){
      console.log('Destroying')
      snake_to_destroy = Utility.returnSnake(socket.id, Game.players)
      Game.numPlayers -= 1;
      snake_to_destroy.destroy()

      console.table(Game.stateBoard)
      socket.broadcast.emit("updatedStateBoard", Game.stateBoard);

      socket.emit("updatePlayers", Utility.sortOnVals(Game.players));
      socket.broadcast.emit("updatePlayers", Utility.sortOnVals(Game.players));
    }
  });
});

//Start Server
server.listen(4000, () => {
  console.log("Server Has Started");
});