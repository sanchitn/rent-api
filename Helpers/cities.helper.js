
var model = require('../DbConnection');
module.exports={

    findCity:function(cond,fields){
        return p1=new Promise(function(resolve,reject){
            model.cities.findAll({where:cond,attributes:fields}).then(function(data){
                resolve(data)
            }).catch(function(err){
                reject(err)
            })
        })
    },

    findOne:function(cond,fields){
        return p1=new Promise(function(resolve,reject){
            model.cities.findOne({where:cond,attributes:fields}).then(function(data){
                resolve(data)
            }).catch(function(err){
                reject(err)
            })
        })

    }



}