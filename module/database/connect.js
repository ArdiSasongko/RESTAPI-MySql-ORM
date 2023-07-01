const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(process.env.NAME_DB, process.env.USER_DB, process.env.PW_DB, {
    host : process.env.HOST_DB,
    port : process.env.PORT_DB,
    dialect : "mysql"
});

module.exports = sequelize
