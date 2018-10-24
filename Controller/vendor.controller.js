
var userHelper = require('.././Helpers/user.helper');

module.exports={


    getVendorDetails:function(req,res){

        userHelper.findAssociationData(req.query,function(err,data){


            if(err){

            }else{
                return res.status(200).json({code:200,vendorInfo:data})
            }
        })
    },


    getItemDetails:function(req,res){

        userHelper.findItemDetails(req.query,function(err,data){


            if(err){

            }else{
                return res.status(200).json({code:200,vendorInfo:data})
            }
        })
    }
}