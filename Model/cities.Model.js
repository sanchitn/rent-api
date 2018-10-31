'use strict'
module.exports = function (sequelize, DataTypes) {
   
    const Cities = sequelize.define("cities", 
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            state_id:{
                type: DataTypes.UUID
            },
            city_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
            // updated_at:{
            //     type: DataTypes.DATE
            // },
            // created_at: {
            //     type: DataTypes.DATE,
            //     defaultValue: DataTypes.NOW
            // }

        }
    );
    return Cities;
}
