var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var authToken=require('./lib/auth');
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

var whitelist = ['http://192.168.0.152:4200','http://localhost:4200',"http://192.168.0.140:8083","http://192.168.0.148:8282","http://localhost:3005","chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop"]
 var corsOptions = {
    origin: function (origin, callback) {
     
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        console.log("Success")
       
        callback(null, true)
      } else {
        console.log('Not allowed by CORS')
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
app.use(cors(corsOptions));
app.use(function(req,res,next){


  var preventiveUrl=['/createOrder'];
  var index=preventiveUrl.indexOf(req.url);
  console.log(index)
  if(index>-1){
    var token =(req.headers['token'])?req.headers['token']:"";
   
    if(token!=""){
     
      authToken.verifyJWTToken(token).then(function(data){
       
        req.uid=data['id'];
        req.roleId=data['roleId'];
        next();
      }).catch(function(err){
        return res.status(401).json({code:401,message:"User not authorized"})
  
      })
    }else{
      return res.status(401).json({code:401,message:"User not authorized"})
    }
  }else{
    next();
  }
  
  
  
  
})
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