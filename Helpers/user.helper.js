
var model = require('../DbConnection');
module.exports={
    findOne:function(cond){
       
        return p1=new Promise(function(resolve,reject){
            model.users.findOne({where:cond}).then(data => {
                    
                        
                resolve(data)
                   
            }).catch(err=>{

                reject(err)
            })
        })
    },
    saveUser:function(data){

        const user = model.users.build(data);
        return p1=new Promise(function(resolve,reject){
            user.save().then(function(datas){
              
                    resolve(datas)
              
            }).catch(error => {
                reject(error)
              })
        })
    },
    updateUser:function(data){
       
        return p1=new Promise(function(resolve,reject){
          
            model.sequelize.query('UPDATE users SET otp =' +data['otp']+' WHERE uid ='+data['uid']).then((results) => {
                resolve(results)
            })
            })

    },
    findAssociationData:function(data,cb){
    
        model.users.findAll({
            attributes: ['uid', 'name', 'phone_number', 'email','pin_code','address'],
            where: { city_id:data.cityId,state_id:data.stateId,pin_code:data.zipCode},
            include: [{
                model: model.items,
                attributes: ['item_name']
            },
            {
                model: model.cities,
                attributes: ['city_name','id']
            },
            {
                model: model.states,
                attributes: ['state_name','id']
            }
        ]
        }).then(data => {
           cb(null,data)
        }).catch(err=>{
            cb(err,null)

        })
    },


    findItemDetails:function(data,cb){
        console.log(data); 
        model.users.findAll({
            attributes: ['uid', 'name', 'phone_number', 'email','pin_code','address'],
            where: { uid:data.vendorId},
            include: [
            {
                model: model.items,
                attributes: ['id','item_name','price_unit'],
                include:[
                    {
                    model: model.inventories,
                    attributes: ['id','item_id','available_quantity'],
                    }
                ]
            },
            
            {
                model: model.cities,
                attributes: ['city_name','id']
            },
            {
                model: model.states,
                attributes: ['state_name','id']
            }
        ]
        }).then(data => {
           cb(null,data)
        }).catch(error=>{
            console.log(error)
            cb(err,null)

        })

    },

    


}