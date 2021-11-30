// const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
// const passport = require("passport");
// const passportLocal = require("passport-local").Strategy;
// const cookieParser = require("cookie-parser");
// const bcrypt = require("bcryptjs");
// const session = require("express-session");
// const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const Game = require('./game');
const Utility = require('./utility');
const { connect } = require("http2");
const { default: socket } = require("../client/src/socket");
const path = require("path");

//----------------------------------------- END OF IMPORTS---------------------------------------------------
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res, next) => {
  // console.log(path.resolve(__dirname, "../client", "build/index.html"));
  res.sendFile(path.resolve(__dirname, "../client", "build/index.html"))
});

const server = http.createServer(app);

const socketServerOptions = { };
if (process.env.NODE_ENV !== "production"){
  socketServerOptions.cors = { origin: "http://localhost:3000" };
}

const io = new Server(server, socketServerOptions);

//SOCKET.IO 
//connection class
var GAME = new Game.Game();

io.on("connection", (socket) => {// Listens for client for connection and disconnection
  console.log("User connected: " + socket.id);
  
  socket.on("initPlayer", (nname) => {//returns player obj, otherwise makes new player and increment count
    SNAKE = GAME.createSnake(socket.id);
    SNAKE.nickname = nname;
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
      socket.emit("GameOver")
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

  // socket.on("setNickname", (nickname) =>
  // {

  // });

  socket.on("saveNickname", (nname) =>
  {
    // snake=Utility.returnSnake(socket.id, Game.players);
    if(Utility.returnSnake(socket.id, Game.players) !== undefined){
      snake=Utility.returnSnake(socket.id, Game.players);
      snake.nickname = nname;
      console.log(snake);
      socket.emit("updatePlayers", snake);
      socket.broadcast.emit("updatePlayers", snake);
    }
    socket.emit("playerNickname", nname);
    
  });

  socket.on("disconnect", () => {  
    console.log('Destroying')

    if(Utility.returnSnake(socket.id, Game.players) !== undefined){
      snake_to_destroy = Utility.returnSnake(socket.id, Game.players)
      Game.numPlayers -= 1;
      snake_to_destroy.destroy()
      socket.broadcast.emit("updatedStateBoard", Game.stateBoard);

      socket.emit("updatePlayers", Utility.sortOnVals(Game.players));
      socket.broadcast.emit("updatePlayers", Utility.sortOnVals(Game.players));
    }
  });
});

//Start Server
server.listen(process.env.PORT || 4000, () => {
  console.log("Server Has Started");
});