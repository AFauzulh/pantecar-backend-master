const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/database');

class Transaction extends Model {  }

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
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'transaction'
})

module.exports = Transaction;