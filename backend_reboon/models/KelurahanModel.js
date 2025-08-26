const {Sequelize} = require("sequelize");
const db = require("../config/Database.js");

const {DataTypes} = Sequelize;

const Kelurahan = db.define('kelurahan', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    kecamatan_id: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
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

module.exports = Kelurahan;

