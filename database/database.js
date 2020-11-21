const Sequelize = require('sequelize');

const sequelize = new Sequelize('carpanter_master', 'root', '', {
    dialect: 'mysql', host: 'localhost'
});

module.exports = sequelize;