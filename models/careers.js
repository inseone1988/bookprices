const {Sequelize, Model, DataTypes} = require("sequelize");
const sequelize = require("../config/sequelize");

class Career extends Model {
};

Career.init(
    {
        CAREER_ID: {
            type : DataTypes.INTEGER,
            primaryKey : true
        },
        CAREER_NAME: DataTypes.STRING
    },{
        sequelize,
        modelName: 'Carrera',
        timestamps: false
    }
);
module.exports = Career;