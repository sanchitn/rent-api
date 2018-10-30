
var model = require('../DbConnection');
module.exports={

    saveOrder:function(data){
        
        const order = model.orders.build(data);
       
        return p1=new Promise(function(resolve,reject){
            order.save().then(function(datas){
              
                    resolve(datas)
              
            }).catch(error => {
                reject(error)
              })
        })
    },

    blukSave:function(data){
        const orderInfo = model.orderInformation.build(data);
        return p1=new Promise(function(resolve,reject){
            model.orderInformation.bulkCreate(data).then((data) => { // Notice: There are no arguments here, as of right now you'll have to...
                 resolve(data)
              }).catch(err=>{

                reject(err)
              })
              
        })

    },


    findOrderDetails:function(data,cb){

        
        model.orders.findAll({
            attributes: ['id','total', 'subTotal', 'transportation_total', 'refundable_amount','pickup_date','return_date','status'],
            where: {},
            order: [
                ['pickup_date', 'DESC'],
                ['createdAt', 'DESC'],
            ],
            include: [
                {
                    model: model.orderInformation,
                    attributes:['quantity','item_id'],
                    include:[{

                        model: model.items,
                        attributes:['price_unit','item_name'],
                        
                    }
                    ]
                },
                {
                    model: model.users,
                    attributes:['vendor_name','uid','phone_number','address'],
                    as:'vendorId',
                    include:[
                        {
                        model: model.cities,
                        attributes:['city_name'],
                        },
                        {
                            model: model.states,
                            attributes:['state_name'],
                        }
                    ]
                },
                {
                    model: model.users,
                    attributes:['phone_number','uid'],
                    as:'userId',
                    include:[
                        {
                        model: model.cities,
                        attributes:['city_name'],
                        },
                        {
                            model: model.states,
                            attributes:['state_name'],
                        }
                    ]
                }
                
        ]
        }).then(data => {

           cb(null,data)
        }).catch(err=>{
            cb(err,null)

        })

    }



}