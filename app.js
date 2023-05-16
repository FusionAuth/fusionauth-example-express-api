require('dotenv').config(); // this loads env vars

var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
const authentication = require('./middlewares/authentication');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:5173', credentials: true}));

app.use(authentication);

app.use('/', indexRouter);

module.exports = app;
