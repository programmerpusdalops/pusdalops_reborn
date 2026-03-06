const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const { DataTypes } = Sequelize;

const Infografis = db.define('infografis', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    judul: {
        type: DataTypes.STRING,
    },
    tahun: {
        type: DataTypes.STRING,
    },
    kategori: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    },
},
    {
        tableName: 'infografis',
        freezeTableName: true,
    });

module.exports = Infografis;
