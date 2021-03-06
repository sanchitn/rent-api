'use strict'
module.exports = function (sequelize, DataTypes) {
   
    const States = sequelize.define("states", 
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            state_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },

            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }

        }
    );
    return States;
}
