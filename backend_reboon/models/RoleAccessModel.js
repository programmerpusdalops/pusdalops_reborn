const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const {DataTypes} = Sequelize;

const RoleAccess = db.define('role_access', {
    id_role_access: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    menu:{
        type: DataTypes.STRING,
    },
    role_id:{
        type: DataTypes.STRING
    },
    can_create:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    can_read:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    can_update:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    can_delete:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    can_other:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
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

module.exports = RoleAccess;

