var userSignUpController=require("../../Controller/user.signUp.controller");
var middleware=require("../../Middleware/test.middleware")
/* GET home page. */
module.exports = function (router) {
    router.post('/signUp',userSignUpController.signUp);
    router.post('/bulkVendorSignUp',userSignUpController.bulkVendorSignUp);
    

}
