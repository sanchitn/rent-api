var path = require('path');
var fileHelper = require('.././Helpers/file.Helper');
var stateHelper = require('.././Helpers/states.helper');
var cityHelper = require('.././Helpers/cities.helper');
var userHelper = require('.././Helpers/user.helper');
var mailHelper = require('.././Helpers/mailer.helper');
var phoneLib=require('.././lib/sms');
var tokenLib=require('.././lib/auth')
var fs = require('fs');
const Sequelize = require('sequelize');

function jsUcfirst(string)

{

    return string.charAt(0).toUpperCase() + string.slice(1);

}

function checkUser(data, cb) {
    
    var cond = {};
    const Op = Sequelize.Op;
    cond = {
        is_deleted:0,
        [Op.or]: [{
            phone_number: data['phone_number']
        }, {
            email: data['email']
        }]
    };
    if(data['role_id'] && data['role_id']==2){

        cond['role_id']=data['role_id']
    }
    //console.log(cond);return 
    userHelper.findOne(cond).then(function (datas) {

        cb(null, data)

    }).catch(function (err) {
        cb(err, null)

    })
}

function bulkSignUp(data, cb) {

    checkUser(data, function (err, datas) {

        if (datas) {
            console.log(data);
            userHelper.saveUser(data).then(function (datast) {
               
                if(datast){
                    cb(null, {
                        code: 200
                    })
                }
               

            }).catch(function (err) {
                
                cb(err, {
                    code: 500
                })

            })
        } else {
            cb(null, {
                code: 409
            })
        }


    })



}

module.exports = {

    signIn: function (req, res) {
       
        try {
            if (req.body['mobileNumber']) {
               
                phoneLib.checknumber(req.body['mobileNumber'],function(err,datas){

                    if(err){
                        return res.status(500).json({code:500,"message":"Some error occured"})
                    }else{
                       
                        if(datas){
                            
                            let cond={};
                            cond['phone_number']=req.body['mobileNumber'];
                            cond['role_id']=1 //Customer
                            let otp=phoneLib.generateOTP();
                            userHelper.findOne(cond).then(function(user){
                                let data={};
                                data['phone_number']=req.body['mobileNumber'];
                                data['role_id']=1;
                                data['otp']=otp;
                               
                                let message="Welcome, your otp is"+" "+otp;
                                if(user){
                                    data['uid']=user['uid'];
                                    
                                    userHelper.updateUser(data).then(function(saveData){
                                        if(saveData){
                                            

                                            phoneLib.sendMessage(message,req.body['mobileNumber'],function(err1,datam){
                                                if(err1){
                                                    console.log(err1)
                                                    return res.status(500).json({code:500,"message":"Some error occured",err:err1});

                                                }else{
                                                    return res.status(200).json({code:200,'message':"Please enter your otp",otp:otp})
                                                }


                                            })
                                        }
                                        
                                    }).catch(function(err){
                                        console.log(err)
                                        return res.status(500).json({code:500,"message":"Some error occured",err:err});
        
                                    })
                                }else{
                                   
                                    userHelper.saveUser(data).then(function(saveData){
                                        if(saveData){
                                            

                                            phoneLib.sendMessage(message,req.body['mobileNumber'],'TestUser',function(err1,datam){
                                                if(err1){
                                                    console.log(err1)
                                                    return res.status(500).json({code:500,"message":"Some error occured",err:err1});

                                                }else{
                                                    return res.status(200).json({code:200,'message':"Please enter your otp",otp:otp})
                                                }


                                            })
                                        }
                                        
                                    }).catch(function(err){
                                        return res.status(500).json({code:500,"message":"Some error occured",err:err});
        
                                    })
                                }

                            }).catch(function(err){
                                console.log("====>",err)
                            })
                           
                        }else{
                            return res.status(200).json({code:500,'message':"Please enter 10 digits correct mobile number"})
                        }
                    }
                })
            }else{
                return res.status(200).json({code:500,"message":"Please enter mobile number"})
            }
        } catch (err) {

        }

    },

    verifyOtp:function(req,res){
        if(req.body['mobileNumber'] && req.body['otp']){
            let data={}
            data['phone_number']=req.body['mobileNumber'];
            data['role_id']=req.body['role_id'];
            data['otp']=req.body['otp'];
           
            userHelper.findOne(data).then(function(user){
                    
                    if(user){
                      
                        var token=tokenLib.createJWToken({id:user['uid']});
                        return res.status(200).json({code:200,message:"Otp verified successfully",token:token})

                    }else{
                        return res.status(200).json({code:401,message:"Otp not matched"})
                    }
            })
        }
    },
    bulkVendorSignUp: function (req, res) {

        fileHelper.createFolder('uploads').then(function (data1) {

            if (data1) {
                return data1;
            } else {
                return res.status(500).json({
                    code: 500,
                    error: "Error while creating folder",
                    message: "Some error occured"
                })

            }
        }).then(function (data2) {

            fileHelper.processFile(req, 'uploads').then(function (datas) {

                if (datas) {

                    return datas
                } else {
                    return res.status(500).json({
                        code: 500,
                        error: "Error while file process",
                        message: "Some error occured"
                    })
                }

            }).then(function (data3) {

                fileHelper.covertXlsToJson(data3).then(function (data) {
                    fs.unlinkSync(data3);
                    var async = require('async');
                    var notAdded=[];
                    var addedEntries=[];
                    async.eachSeries(data,
                        function (item, cb) {

                            let dataReq = {};
                            if (item['Name']) {
                                dataReq['name'] = item['Name']
                            }
                            if (item['Vendor_Name']) {
                                dataReq['vendor_name'] = item['Vendor_Name']
                            }
                            if (item['Email_Id']) {
                                dataReq['email'] = item['Email_Id'].toLowerCase();
                            }
                            if (item['Phone_Number']) {
                                dataReq['phone_number'] = item['Phone_Number']
                            }

                            if (item['PinCode']) {
                                dataReq['pin_code'] = parseInt(item['PinCode']);
                            }
                            if (item['Address']) {
                                dataReq['address'] = item['Address'];
                            }


                            var cond = {};
                            cond['state_name'] = jsUcfirst(item['State']);
                            var project = ['id'];
                            stateHelper.findStateByName(cond, project).then(function (data) {

                                if (data) {
                                    dataReq['state_id'] = data.id;
                                    var cond2 = {};
                                    cond['city_name'] = jsUcfirst(item['City']);
                                    cityHelper.findOne(cond2, project).then(function (cityData) {
                                        if (cityData) {
                                            dataReq['city_id'] = cityData.id;
                                            dataReq['password'] = Math.random().toString(36).slice(-8);
                                            dataReq['role_id'] = 2;


                                            bulkSignUp(dataReq, function (err, data) {
                                                if (err) {
                                                    cb();
                                                } else {
                                                   
                                                    if(data.code==409){
                                                        item['message']="Vendor already exist";
                                                        notAdded.push(item)
                                                    }else if(data.code==200){

                                                        addedEntries.push(item);
                                                        item.subject="Vendor Registration";
                                                        item.message="Hi, you have been registered as a vendor.Your password to login is"+" "+dataReq['password']
                                                        mailHelper.sendMail(item,function(err1,data1){
                                                            if(err1){
                                                                console.log(err1)
                                                            }else{
                                                                
                                                                console.log(data1)
                                                            }

                                                        })
                                                       

                                                    }
                                                    cb();
                                                   
                                                    
                                                }
                                            })
                                        } else {
                                            item['message']="City doesn't exist";
                                            notAdded.push(item)
                                            cb();
                                        }

                                    })

                                } else {
                                    item['message']="State Doesn't exist";
                                    notAdded.push(item)
                                    cb();
                                }



                            })




                        },function(err){
                            if(err){
                                return res.status(500).json({code:500,message:"Some error occured.",error:err})
                            }else{
                              
                                return res.status(200).json({code:200,message:"Vendor added successfully.",errorEntry:notAdded,successEntries:addedEntries})
                            }
                            
                        })

                }).catch(function (err) {

                    return res.status(500).json({
                        code: 500,
                        error: "Error while coverting xls to json",
                        message: "Some error occured"
                    })

                })
            }).catch(function (err) {

                return res.status(500).json({
                    code: 500,
                    error: "Error while file process",
                    message: "Some error occured"
                })

            })


        }).catch(function (err) {
            return res.status(500).json({
                code: 500,
                error: "Error while file process",
                message: "Some error occured"
            });

        })







    }

}