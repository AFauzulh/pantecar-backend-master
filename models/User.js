const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/database');

class User extends Model { }

User.init({
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_card_number: {
        type: DataTypes.STRING(16),
        unique: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    driver_license_url: {
        type: DataTypes.STRING
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user'
});

module.exports = User;