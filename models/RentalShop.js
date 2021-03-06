const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/database');

class RentalShop extends Model { }

RentalShop.init({
    id_shop: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bank_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bank_account_no: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number_of_cars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }

}, {
    sequelize,
    modelName: 'rental_shop',
    timestamps: false
});

module.exports = RentalShop;