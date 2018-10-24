const Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var basename = path.basename(__filename);
let config = require('.././config');
var db = {};
const sequelize = new Sequelize('ecommerce', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

fs.readdirSync(__dirname + '/.././Model/').filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    }).forEach(file => {

        var model = sequelize['import'](path.join(__dirname + '/.././Model/', file));
        db[model.name] = model;
    });
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.users.hasMany(db.items, {foreignKey: 'vendor_id'});
db.users.belongsTo(db.cities, {foreignKey: 'city_id'});
db.users.belongsTo(db.states, {foreignKey: 'state_id'});
db.items.hasOne(db.inventories, {foreignKey: 'item_id'});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db