
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
    }



}