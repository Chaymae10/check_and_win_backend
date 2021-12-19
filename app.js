var express = require('express');
var logger = require('morgan');

var cors =require("cors");
let corsOptions = {
    origin: "http://localhost:8080",
};

var authsRouter = require("./routes/auths");
var scoreRouter = require("./routes/scores");
var usersRouter = require("./routes/users");
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/auths',cors(corsOptions), authsRouter);
app.use('/scores',scoreRouter);
app.use('/users',cors(corsOptions),usersRouter);
module.exports = app;
