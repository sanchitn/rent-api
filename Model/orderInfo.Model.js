'use strict';
const bcrypt = require("bcrypt");


module.exports = function (sequelize, DataTypes) {
   
    const OrderInformation = sequelize.define("orderInformation", 
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            order_id:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            item_id:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            quantity:{
                type: DataTypes.INTEGER,
                allowNull: false,
                default:0
            }
        }
    )
    
    
   
    return OrderInformation;
}
