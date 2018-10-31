var userHelper = require('.././Helpers/user.helper');
var fileHelper = require('.././Helpers/file.Helper');
var inventotyHelper = require('.././Helpers/inventory.helper');
module.exports = {


    getVendorDetails: function (req, res) {

        userHelper.findAssociationData(req.query, function (err, data) {


            if (err) {

            } else {
                return res.status(200).json({
                    code: 200,
                    vendorInfo: data
                })
            }
        })
    },


    getItemDetails: function (req, res) {

        userHelper.findItemDetails(req.query, function (err, data) {


            if (err) {

            } else {
                return res.status(200).json({
                    code: 200,
                    vendorInfo: data
                })
            }
        })
    },


    addItems: function (req, res) {
       
        if (req.body) {
            
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
                
                    if(req.body['vendorId']){
                        fileHelper.covertXlsToJson(data3).then(function (data) {
                            //fs.unlinkSync(data3);
                            var async = require('async');
                            var notAdded = [];
                            var addedEntries = [];
                            
                            async.eachSeries(data,
                                function (item, cb) {
                                   
                                    
                                    let dataReq = {vendor_id:req.body['vendorId'],is_active:1};
                                   
                                    if (item['Item']) {
                                        dataReq['item_name'] = item['Item'].toLowerCase()
                                    }
                                    if (item['Price']) {
                                        dataReq['price_unit'] = item['Price']
                                    }
                                    
                                    
                                    let cond={};
                                
                                    if(dataReq['item_name']){
                                        cond['vendor_id']=req.body['vendorId'];
                                        cond['item_name']= dataReq['item_name'];
                                     
                                        inventotyHelper.findItem(cond).then(function(data){
                                           
                                            if(data){
                                                let dataUpdate={}
                                                dataUpdate['id']=data.id;
                                                dataUpdate['price_unit']=item['Price'];
                                                dataUpdate['vendor_id']=req.body['vendorId']
                                             
                                                inventotyHelper.updateItem(dataUpdate).then(function(datas){
                                                   
                                                    return datas;
                                                }).then(function(itemInfo){
                                                    var itemsObj={};
                                                   
                                                    itemsObj['item_id']=data.id;
                                                    itemsObj['vendor_id']=req.body['vendorId'];
                                                    itemsObj['available_quantity']=(item.Quantity)?parseInt(item.Quantity):0;
                                                   
                                                    inventotyHelper.updateItemInventory(itemsObj,function(errm,datam){
                                                            if(errm){
                                                                    cb();
                                                            }else{
                                                                    cb();
                                                            }
    
                                                    })
                                                })
                                            }else{
                                                inventotyHelper.addItem(dataReq).then(function(datas){
    
                                                    return datas;
                                                }).then(function(itemInfo){
                                                    var itemsObj={};
                                                    itemsObj['item_id']=itemInfo.id;
                                                    itemsObj['vendor_id']=req.body['vendorId'];
                                                    itemsObj['available_quantity']=(item.Quantity)?parseInt(item.Quantity):0;
                                                    
                                                    inventotyHelper.addItemInventory(itemsObj,function(errm,datam){
                                                            if(errm){
                                                                    cb();
                                                            }else{
                                                                    cb();
                                                            }
    
                                                    })
                                                })
                                            }
        
                                        }).catch(function(err){
        
        
                                        })
                                    }else{
                                        cb();
                                    }
                                    
                                },
                                function (err) {
                                    if (err) {
                                        return res.status(500).json({
                                            code: 500,
                                            message: "Some error occured.",
                                            error: err
                                        })
                                    } else {
    
                                        return res.status(200).json({
                                            code: 200,
                                            message: "Items added successfully.",
                                            errorEntry: notAdded,
                                            successEntries: addedEntries
                                        })
                                    }
    
                                })
    
                        }).catch(function (err) {
    
                            return res.status(500).json({
                                code: 500,
                                error: "Error while coverting xls to json",
                                message: "Some error occured"
                            })
    
                        })
                    }else{
                        return res.status(500).json({
                            code: 500,
                            
                            message: "Please select vendor"
                        })
                    }
                   
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
        } else {
            return res.status(500).json({
                code: 500,
                message: "Invalid Request"
            })
        }

    }
}