const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const { DataTypes } = Sequelize;

const JenisKejadian = db.define('jenis_kejadian', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
    },
    nama: {
        type: DataTypes.STRING
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    },
    deletedAt: {
        field: 'deleted_at',
        type: Sequelize.DATE,
    },
});


module.exports = JenisKejadian;

