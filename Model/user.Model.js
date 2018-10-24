'use strict';
const bcrypt = require("bcrypt");


module.exports = function (sequelize, DataTypes) {
   
    const Users = sequelize.define("users", 
        {
            uid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            vendor_name:{
                type: DataTypes.STRING,
                allowNull: true
            },
            phone_number:{
                type: DataTypes.STRING,
                allowNull: false
            },
            phone_verified:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            is_deleted:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            password:{
                type: DataTypes.STRING,
            },
            role_id:{
                type: DataTypes.INTEGER
            },
            email:{
                type: DataTypes.STRING,
                allowNull: false
            },
            email_verified:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue:false
            },
            state_id:{
                type: DataTypes.INTEGER,
                allowNull: false,

            },
            address:{
                type: DataTypes.STRING,
                allowNull: false
            },
            city_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            pin_code:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        },
        {
            hooks : {
                beforeCreate : (users , options) => {
                    {
                        users.password = users.password && users.password != "" ? bcrypt.hashSync(users.password, 10) : "";
                    }
                }
            }
        }
    )
    
    
   
    return Users;
}
