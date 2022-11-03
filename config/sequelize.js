const {Sequelize} = require("sequelize");

const sequelize = new Sequelize({
    dialect : "sqlite",
    storage : "\\\\servidor\\Base2020\\db.db"
});

module.exports = sequelize;