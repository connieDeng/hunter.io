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
const Utility = require('./utility')
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
  
  socket.on("initPlayer", (socket_id) => {//returns player obj, otherwise makes new player and increment count
    SNAKE = GAME.createSnake(socket_id);
    GAME.addSnake(SNAKE);
    Game.numPlayers += 1;
    console.log(SNAKE);
    console.table(Game.stateBoard);

    socket.emit("initializedPlayer", Game.stateBoard);
  });

  socket.on("moveSnake", () => {
    SNAKE.move()
    socket.emit("playerMoved", Game.stateBoard);
    console.table(Game.stateBoard)
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
    Game.numPlayers -= 1;
  });
});

//Start Server
server.listen(4000, () => {
  console.log("Server Has Started");
});

/*
  socket.on("checkPlayer", () => {//returns player obj, otherwise makes new player and increment count
    if (Game.numPlayers === 0){
      game = new Game.Game();
    }
    SNAKE = game.createSnake(socket.id);
    game.addSnake(SNAKE);
    Game.numPlayers += 1
    console.log(Game.numPlayers)
    console.table(Game.stateBoard)
    socket.emit("playerCreated", Game.stateBoard);
  });

  socket.on("moveSnake", (id) => {
    // console.log(SNAKE)
    // SNAKE.move();
    // socket.emit("updatedStateBoard", Game.stateBoard);

    setTimeout(function(){
      console.log(snake)
      snake.move();
      console.table(Game.stateBoard)
      socket.emit("updatedStateBoard", Game.stateBoard);
    }, 1000)
  });
  */