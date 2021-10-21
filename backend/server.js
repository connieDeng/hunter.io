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
const Snake = require("./snake")
//----------------------------------------- END OF IMPORTS---------------------------------------------------

console.log('here')
bot1 = new Snake.bot_snake("LMNAO");
bot1.show()