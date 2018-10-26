const Nexmo = require('nexmo');
var config = require('.././config/index.js');
const nexmo = new Nexmo({
    apiKey: config.nexmoKey,
    apiSecret: config.nexmoApiSecret
})

function sendMessage(message, tos, cb) {
   
    try{
        const from = config.from
        const to = "+91"+tos
        const text = message
        console.log("===",to)
        nexmo.message.sendSms(from, to, text,(err, responseData) => {
            if (err) {
                cb(err, null)
            } else {
                
                cb(null,true)
            }
          })
       
    }catch(err){
        cb(err,null)
    }
   
   
}

function checknumber(inputtxt,cb) {
    
    try{
        var phoneno = /^\d{10}$/;
       // console.log(inputtxt.match(phoneno))
        if(String(inputtxt).match(phoneno)) {
            cb(null,true)
          }
          else {
           
            cb(null,false)
          
          }
    }catch(err){
        console.log(err)
        cb(err,null)
    }
   
}


function generateOTP() { 
          
    // Declare a digits variable  
    // which stores all digits 
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
} 

module.exports = {
    sendMessage,
    checknumber,
    generateOTP
}