'use strict';
const bcrypt = require("bcrypt");


module.exports = function (sequelize, DataTypes) {
   
    const Order = sequelize.define("orders", 
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            orderId: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:"NA"
            },
            user_id:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            vendor_id:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            total:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            subTotal:{
                type: DataTypes.INTEGER,
                allowNull: false,
                default:0
            },
            transportation_total:{
                type: DataTypes.INTEGER,
                defaultValue:0,
                allowNull: false,
            },
            pickup_date:{
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            refundable_amount:{
                type: DataTypes.INTEGER,
                defaultValue:0,
                allowNull: false,
            },
            return_date:{
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            status:{
                type: DataTypes.ENUM,
               
                values: ['pending', 'served', 'completed']
            }
        }
    )
    
    
   
    return Order;
}
