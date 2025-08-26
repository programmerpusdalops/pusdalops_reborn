const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const {DataTypes} = Sequelize;

const Sktd = db.define('sktd', {
    id_sktd: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_kejadian: {
        type: DataTypes.STRING,
    },
    url:{
        type: DataTypes.STRING,
    },
    file:{
        type: DataTypes.STRING,
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    }
});

module.exports = Sktd;

