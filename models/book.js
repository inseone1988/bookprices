const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize');

class Book extends Model {
};

Book.init({
    BOOK_ID: {
        primaryKey : true,
        type: DataTypes.INTEGER
    },
    BOOK_NAME: DataTypes.STRING,
    BOOK_AUTHOR: DataTypes.STRING,
    BOOK_PUBLISHER: DataTypes.STRING,
    CAREER: DataTypes.STRING,
    CUATRI: DataTypes.STRING,
    EDITION: DataTypes.STRING,
    ACTUALIZED: DataTypes.BOOLEAN,
    COPIES: DataTypes.INTEGER,
    FILE_PATH: DataTypes.STRING,
    CHARGE_ENGARGOLADO: DataTypes.BOOLEAN,
    PRINT_SETTINGS: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Book',
    timestamps: false
})

module.exports = Book;