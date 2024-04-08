const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static("."));

const cors = require('cors');
app.use(cors());

app.listen(8080);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const rootRoute = require('./routes');
app.use("/api", rootRoute);

require("./passport")

const session = require('express-session');
const cookieParser = require("cookie-parser");

app.use(cookieParser(process.env.JWT_SECRET_KEY))

app.use(session({
  secret: process.env.JWT_SECRET_KEY, 
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure: false,
    httpOnly: true,
    maxAge: 20 * 60 * 1000
  }
}));