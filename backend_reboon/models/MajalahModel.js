const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const { DataTypes } = Sequelize;

const Majalah = db.define('majalah', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    judul: {
        type: DataTypes.STRING,
    },
    sampul: {
        type: DataTypes.STRING,
    },
    url_sampul: {
        type: DataTypes.STRING,
    },
    file_pdf: {
        type: DataTypes.STRING,
    },
    url_pdf: {
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
        tableName: 'majalah',
        freezeTableName: true,
    });

module.exports = Majalah;
