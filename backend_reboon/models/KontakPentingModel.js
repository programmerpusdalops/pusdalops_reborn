const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const { DataTypes } = Sequelize;

const KontakPenting = db.define('kontak_penting', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: DataTypes.STRING,
    },
    jabatan: {
        type: DataTypes.STRING,
    },
    nomor: {
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
        tableName: 'kontak_penting',
        freezeTableName: true,
    });

module.exports = KontakPenting;
