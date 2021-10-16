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
const User = require("./user");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const usersnake = require("./snake-setup")

//----------------------------------------- END OF IMPORTS---------------------------------------------------
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});


mongoose.connect(
  "mongodb+srv://admin:HunterioPassword@cluster0.37i56.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});
app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});


app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});
//----------------------------------------- END OF ROUTES---------------------------------------------------

//SOCKET.IO 
var Players = {};
var PlayerCount = 0

io.on("connection", (socket) => {// Listens for client for connection and disconnection
  console.log("User connected: " + socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
    // Loop and disconnect them for the Players array
  });

  socket.on("FFA_Joined",(nname) => {
    socket.join("FFA");
    //setClientNickname(socket.id,nname);
    console.log("User: " + socket.id + " join FFA Room as " + nname);
  });

  socket.on("checkPlayer", (id) => {//returns player obj, otherwise makes new player and increment count
    console.log("Create player received", Players[id])
    if(Players[id] !== undefined){
      socket.to("FFA").emit("playerCreated", Players[id])
    }
    else{
      PlayerCount+=1;
      const player = new usersnake.user_snake(id,PlayerCount);
      Players[id] = player;
      socket.to("FFA").emit("playerCreated", Players[id]);
    }
  });

  socket.on("DisplayClients", () => {
    console.log(Player);
    socket.emit("returnUsers", Players);
  });

  socket.on("gameUpdated", (snake, apple) => {
    socket.to("FFA").emit("UpdateReceived",{snake, apple})
  });

  socket.on("PlayersMove", () => {
    socket.to("FFA").emit("PlayerTurn", Player[socket.id]) 
  });
  
});

//Start Server
server.listen(4000, () => {
  console.log("Server Has Started");
});
