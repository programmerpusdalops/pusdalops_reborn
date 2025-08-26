const {Sequelize} = require("sequelize");
const db = require("../config/Database.js");

const {DataTypes} = Sequelize;

const Role = db.define('roles', {
    id_role: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    title:{
        type: DataTypes.STRING,
        unique: true
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

module.exports = Role;

