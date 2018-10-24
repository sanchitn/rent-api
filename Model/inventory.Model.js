'use strict';
const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
   
    const Inventory = sequelize.define("inventories", 
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            
            item_id:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            vendor_id:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            available_quantity:{
                type: DataTypes.INTEGER,
                allowNull: false,
               
            }
            // created_at: {
            //     type: DataTypes.DATE,
            //     defaultValue: DataTypes.NOW,
            //     allowNull: false
            // },
            // updated_at: {
            //     type: DataTypes.DATE,
            //     defaultValue: DataTypes.NOW,
            //     allowNull: false
            // }
        }
    )
    
    
   
    return Inventory;
}
