
var stateHelper=require('../Helpers/states.helper.js');
var cityHelper=require('../Helpers/cities.helper.js')
module.exports = {
    /*
        ApiNames:getStates
        Description:to fetch all states from states table 
        Method:get
    */
    createOrder: function (req, res) {
       
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
          
            if(totalQuantity<=300){
                sum=sum+500;
            }else{
                sum=sum+1000;
            }
          
            if(sum==req.body['total']){

            }else{
                return res.status(200).json({code:500,message:"Some thing wrong with the order"})

            }
        }else{
            return res.status(200).json({code:500,message:"Some thing wrong with the order"})
        }
    },
    getCities: function (req, res) {

        try{
            let cond={}
            cond={is_active:1};
            if(req.query['stateId']){
                cond['state_id']=req.query['stateId']
            }else{
                throw "State Id is required"
            }
            let fields=['city_name','id'];
            cityHelper.findCity(cond,fields).then(function(data){
                return res.status(200).json({code:200,cities:data,message:"Success"})
            }).catch(function(err){
                return res.status(500).json({code:500,states:[],message:"Internal Error occured",error:err})
            })

        }catch(err){

            return res.status(500).json({code:500,cities:[],message:err})
    
        }
       
        
    },

    addCities:function(req,res){


    },


    saveStates:function (req,res){

    }

}