
var model = require('.././DbConnection');

module.exports={

    findAll:function(cond,fields){
        return p1=new Promise(function(resolve,reject){
            model.states.findAll({where:cond,attributes:fields}).then(function(data){
                resolve(data)
            }).catch(function(err){
                reject(err)
            })


        })

    },


    findStateByName:function(cond,fields){
        return p1=new Promise(function(resolve,reject){
            
            model.states.findOne({where:cond,attributes:fields}).then(function(data){
                resolve(data)
            }).catch(function(err){
                reject(err)
            })


        })


    }

}