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
                allowNull: true,
                defaultValue:"NA"
            },
            vendor_name:{
                type: DataTypes.STRING,
                allowNull: true
            },
            phone_number:{
                type: DataTypes.STRING,
                allowNull: false
            },
            otp:{
                type: DataTypes.INTEGER,
                defaultValue:0
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
                allowNull: true,
                defaultValue:"NA"
            },
            email_verified:{
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue:false
            },
            address:{
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue:"NA"
            },
            pin_code:{
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue:0
            }
            // created_at: {
            //     type: DataTypes.DATE,
            //     defaultValue: DataTypes.NOW
            // },
            // updated_at: {
            //     type: DataTypes.DATE,
            //     defaultValue: DataTypes.NOW
            // }
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
    
    Users.prototype.validPassword=function(password){
        
        return bcrypt.compare(password, this.password);
    }
   
    return Users;
}
