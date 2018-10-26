var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const mode = process.env.NODE_ENV || "development";
var env = require('dotenv').config({
  path: `.env.${mode}`
});
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
var mySqlConnection = require('./DbConnection'); //Database connection 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads')));
var whitelist = ['http://localhost:4200',"http://192.168.0.140:8083","http://192.168.0.148:8282"]
 var corsOptions = {
    origin: function (origin, callback) {
      console.log(origin);
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        console.log("Success")
        callback(null, true)
      } else {
        console.log('Not allowed by CORS')
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
app.use(cors(corsOptions))
require('./routes')(app);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;