const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/database');

class Car extends Model { }

Car.init({
    id_car: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    car_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    car_brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number_plate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    car_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    car_transmission: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['automatic', 'manual']]
        }
    },
    number_of_seat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            max: 6
        }
    },
    fuel_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['premium', 'pertamax', 'solar']]
        }
    },
    fare_per_day: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'car'
});

module.exports = Car;