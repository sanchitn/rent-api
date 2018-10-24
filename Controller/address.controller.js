
var stateHelper=require('.././Helpers/states.helper.js');
var cityHelper=require('.././Helpers/cities.helper.js')
module.exports = {
    /*
        ApiNames:getStates
        Description:to fetch all states from states table 
        Method:get
    */
    getStates: function (req, res) {
        let cond={is_active:1};
        let fields=['state_name','id'];
        stateHelper.findAll(cond,fields).then(function(data){

            return res.status(200).json({code:200,states:data,message:"Success"})
        }).catch(function(err){
            return res.status(500).json({code:500,states:[],message:"Internal Error occured",error:err})


        })
       
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