const Sequelize = require("sequelize");

const connection = new Sequelize('guiapress','root','38595199Ifa',{
    host: 'localHost',
    dialect: 'mysql'
});


module.exports = connection;