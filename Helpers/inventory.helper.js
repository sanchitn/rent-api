
var model = require('../DbConnection');
module.exports={

    updateInventory:function(data){
        
        return p1=new Promise(function(resolve,reject){
          
            model.sequelize.query('UPDATE inventories SET available_quantity =' +"available_quantity-"+data['quantity']+' WHERE item_id = '+data['item_id'] +" and vendor_id="+data['vendor_id']).then((results) => {
                resolve(results)
            }).catch(err=>{
                reject(err)
            })
            })
    },
    updateItemInventory:function(data,cb){
       
       
          
            model.sequelize.query('UPDATE inventories SET available_quantity ='+data['available_quantity']+' WHERE item_id = '+data['item_id'] +" and vendor_id="+data['vendor_id']).then((results) => {
                cb(null,results)
            }).catch(err=>{
                cb(err,null)
            })
           
    },

    addItem:function(data){

        
        const items = model.items.build(data);
        return p1=new Promise(function(resolve,reject){
            items.save().then(function(datas){
              
                    resolve(datas)
              
            }).catch(error => {
                reject(error)
              })
        }) 
    },

    updateItem:function(data){
        return p1=new Promise(function(resolve,reject){
          
            model.sequelize.query('UPDATE items SET price_unit='+data['price_unit']+' WHERE id = '+data['id'] +" and vendor_id="+data['vendor_id']).then((results) => {
                resolve(results)
            }).catch(err=>{
                reject(err)
            })
            })
    },

    findItem:function(cond){
        return p1=new Promise(function(resolve,reject){
            model.items.findOne({where:cond}).then(data => {
                    
                        
                resolve(data)
                   
            }).catch(err=>{

                reject(err)
            })
        })
    },

    addItemInventory:function(data,cb){
        const inventory = model.inventories.build(data);
       
            inventory.save().then(function(datas){
              
                cb(null,datas)
              
            }).catch(error => {
                cb(error,null)
            })
        
    }



}