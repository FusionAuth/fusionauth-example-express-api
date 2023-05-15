require('dotenv').config(); // this loads env vars

var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const authentication = require('./middlewares/authentication');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(authentication);

app.use('/', indexRouter);

module.exports = app;