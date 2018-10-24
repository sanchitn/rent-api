var fs = require('fs');
var formidable = require('formidable');
var path =require('path');
var node_xj = require("xls-to-json");
module.exports={


    createFolder:function(folderName){
        
        return p1=new Promise(function(resolve,reject){
            try{
                var dir = './'+folderName;
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }
                resolve(true)
            }catch(err){
                reject(err);
            }
        })
        
        
    },


    processFile:function(data,folderName){
        var form = new formidable.IncomingForm();
        
        //var exceltojson = require("xls-to-json-lc");
        form.parse(data);
        return p1=new Promise(function(resolve,reject){

            form.on('fileBegin', function (name, file){
        
                file.path = __dirname + "/../"+folderName+"/"+ file.name;
              
            });
            form.on('file', function (name, file){
                var filePath=path.join(__dirname,'.././'+folderName+'/'+file.name);
                resolve(filePath);
                return 
               
               
                
               
                
               
               
            });
        })
    },


    covertXlsToJson:function(filePath){

        return p2=new Promise(function(resolve,reject){

            node_xj({
                input: filePath,  // input xls
                output: null
            }, function(err, result) {
                if(err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            });
        })
       
    }




    
}