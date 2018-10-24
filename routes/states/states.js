var statesController=require("../../Controller/address.controller");
//var middleware=require("../../Middleware/test.middleware")
/* GET home page. */
module.exports = function (router) {
  
    router.get('/getStates',statesController.getStates);
    router.get('/getCities',statesController.getCities);
  

}
