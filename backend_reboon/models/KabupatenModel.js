const {Sequelize} = require("sequelize");
const db = require("../config/Database.js");


const {DataTypes} = Sequelize;

const Kabupaten = db.define('kabupaten', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    province_id: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    lat: {
        type: DataTypes.STRING
    },
    long: {
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



module.exports = Kabupaten;

