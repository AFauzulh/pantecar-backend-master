const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/database');

class Transaction extends Model { }

Transaction.init({
    transaction_no: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    borrow_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    return_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    total_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    number_of_days_borrowed: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    transfer_image_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    is_accepted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'transaction'
})

module.exports = Transaction;