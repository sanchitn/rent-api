

var orderHelper=require('../Helpers/order.helper.js');
var inventoryHelper=require('../Helpers/inventory.helper.js');
var async=require('async');
var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };
module.exports = {
    /*
        ApiNames:getStates
        Description:to fetch all states from states table 
        Method:get
    */
    createOrder: function (req, res) {
      console.log("Hererer")
        if(req.body.items && req.body.items.length>0){
            let userId=req.uid;
            
           
            let roleId=req.roleId;
            let sum=0;
            let totalQuantity=0
            for(let i=0;i<req.body.items.length;i++){

                sum+=req.body.items[i]['price_unit']*req.body.items[i]['needed_quantity'];
                totalQuantity+=req.body.items[i]['needed_quantity'];

            }
            sum=sum+req.body['transportationPrice'][0].value;
            let refundableAmount=0
            if(totalQuantity<=300){
                refundableAmount=500
                sum=sum+500;
            }else{
                refundableAmount=1000
                sum=sum+1000;
            }
          
            if(sum==req.body['total']){
                
                let saveData={};
                saveData['orderId']="order"+ID();
                saveData['user_id']=userId;
                saveData['vendor_id']=req.body['vendorId']
                saveData['total']=req.body['total'];
                saveData['subTotal']=req.body['subTotal'];
                saveData['transportation_total']=(req.body['transportationPrice'].length>0)?req.body['transportationPrice'][0].value:0
                saveData['pickup_date']=new Date();
                saveData['return_date']=new Date();
                saveData['refundable_amount']=refundableAmount;
                saveData ['status']="pending";
                orderHelper.saveOrder(saveData).then(function(dataSuccess){
                    if(dataSuccess){
                      
                       var items=[];
                       for(let j=0;j<req.body.items.length;j++){
                           let obj1={};
                           obj1['item_id']=req.body.items[j]['inventory']['item_id'];
                           obj1['quantity']=req.body.items[j]['needed_quantity'];
                           obj1['order_id']=dataSuccess['dataValues']['id']
                           items.push(obj1);

                       }
                       //Save Order Info
                       orderHelper.blukSave(items).then(function(datam){
                            res.status(200).json({code:200,"message":"Order placed successfully"})
                       }).then(function(datam){
                        async.eachSeries(req.body.items,function(item,cb){
                            var inventory={};
                            inventory['quantity']=item['needed_quantity']
                            inventory['item_id']=item['inventory']['item_id'];
                            inventory['vendor_id']=req.body['vendorId'];
                            inventoryHelper.updateInventory(inventory).then(function(data){
            
                                cb(null,true)
                            }).catch(function(err){
                                cb(null,true)
                            })
                           
                        },function(err){
                            if(err){
                                console.log("Hererer I am");
                            }else{
                                res.end()
                            }
            
                        });
                            
                       }).catch(function(err){

                        return res.status(200).json({code:500,message:"Some thing wrong with the order"})
                       })
                    }
                    
                }).catch(function(err){
                   return res.status(200).json({code:500,message:"Some thing wrong with the order"})

                })
            }else{
                return res.status(200).json({code:500,message:"Some thing wrong with the order"})

            }
        }else{
            return res.status(200).json({code:500,message:"Some thing wrong with the order"})
        }
    },
    findOrderDetails: function (req, res) {
        let data={};
        if(req.query[vendorId]){
            
            data['vendor_id']=req.query['vendorId'];
        }
        if(req.query[status]){
            
            data['status']=req.query['status'];
        }
        
        orderHelper.findOrderDetails(data,function(err,data){
            

                return res.status(200).json({data:data})
        })
       
       
    },

    addCities:function(req,res){


    },


    saveStates:function (req,res){

    }

}