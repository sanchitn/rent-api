var tokenLib=require("../lib/auth");

function middleware(req,res,next){
       next();
}

function checkToken(req,res,next){

    if(!req.headers.authorization){
        res.status(401).json({message: "Invalid auth token provided."})
        
    }else{
      tokenLib.verifyJWTToken(req.headers.authorization).then(function(data){
          
          var userInfo= data.data._doc;
          req.user=userInfo
          next();
      }).catch(function(err){
        res.status(400).json({message: "Invalid auth token provided."})
      })
    }
}
function allowCrossDomain(req, res, next) {
    
    var allowedOrigins = [];
    var origin = req.headers.origin;
    
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
   
    //res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
  };


  function checkAdminAccess(req,res,next){

    
    if(req['roleId']==3){
        next();
    }else{
        return res.status(401).json({code:401,message:"UnAuthorized Access"})
    }

  }

module.exports={middleware,checkToken,allowCrossDomain,checkAdminAccess}