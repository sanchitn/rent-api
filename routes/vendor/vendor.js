var vendorController=require("../../Controller/vendor.controller");
//var middleware=require("../../Middleware/test.middleware")
/* GET home page. */
module.exports = function (router) {
  
    router.get('/getVendorDetail',vendorController.getVendorDetails);
    router.get('/getItemDetails',vendorController.getItemDetails);
    
  

}
