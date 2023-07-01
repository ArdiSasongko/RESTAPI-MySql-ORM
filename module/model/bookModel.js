const { DataTypes } = require("sequelize")
const sequelize = require("../database/connect")

const Book = sequelize.define("Books", {
    id_book : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false
    },
    description : {
        type : DataTypes.STRING,
        allowNull : false
    },
    price : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
})

module.exports = Book