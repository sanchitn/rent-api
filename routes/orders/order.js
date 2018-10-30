var orderController=require("../../Controller/order.controller");
//var middleware=require("../../Middleware/test.middleware")
/* GET home page. */
module.exports = function (router) {
  
   
    
  router.post('/createOrder',orderController.createOrder);
  router.get('/findOrderDetails',orderController.findOrderDetails)

}
