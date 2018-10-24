'use strict';
const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
   
    const Items = sequelize.define("items", 
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            
            item_name:{
                type: DataTypes.STRING,
                allowNull: false
            },
            price_unit:{
                type: DataTypes.FLOAT,
                allowNull: false
            },
            is_active:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue:false
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
    
    
   
    return Items;
}
