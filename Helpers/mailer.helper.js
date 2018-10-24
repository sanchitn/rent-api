var nodemailer = require('nodemailer'); 



module.exports={


    sendMail:function(data,cb){

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'sanchitnegi6@gmail.com',
              pass: 'infogain@124'
            }
          });
          console.log(data)
          var mailOptions = {
            from: 'sanchitnegi6@gmail.com',
            to: data.Email_Id,
            subject: data.subject,
            text:data.message
          };
          console.log(mailOptions)
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              cb(error,null);
            } else {
                console.log(info.response);
              cb(null,info.response);
            }
          });
    }
}