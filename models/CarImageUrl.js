const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/database');

class CarImageUrl extends Model { }

CarImageUrl.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'car_image_url'
});

module.exports = CarImageUrl;