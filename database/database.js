const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pantecar_master', 'root', '', {
    dialect: 'mysql', host: 'localhost'
});

module.exports = {
    sequelize: sequelize
};