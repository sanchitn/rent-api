var userSignUpController=require("../../Controller/user.signUp.controller");
var middleware=require("../../Middleware/test.middleware")
/* GET home page. */
module.exports = function (router) {
    router.post('/signIn',userSignUpController.signIn);
    router.post('/verifyOtp',userSignUpController.verifyOtp);
    router.post('/bulkVendorSignUp',userSignUpController.bulkVendorSignUp);
    

}
