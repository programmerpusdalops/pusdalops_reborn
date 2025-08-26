const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const {DataTypes} = Sequelize;

const Dokumentasi = db.define('dokumentasi', {
    id_dokumentasi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_kejadian: {
        type: DataTypes.STRING,
    },
    keterangan:{
        type: DataTypes.STRING,
    },
    jenis_file:{
        type: DataTypes.STRING,
    },
    url:{
        type: DataTypes.STRING,
    },
    image:{
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

module.exports = Dokumentasi;

