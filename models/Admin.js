const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/database');

class Admin extends Model { }

Admin.init({
    id_admin: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    admin_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'admin'
});

module.exports = Admin;
