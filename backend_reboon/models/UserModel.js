const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
const Role = require("./RoleModel.js");
const Kabupaten = require("./KabupatenModel.js")

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    telepon: {
        type: DataTypes.STRING
    },
    kab: {
        type: DataTypes.INTEGER
    },
    url:{
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    role_id: {
        type: DataTypes.STRING
    },
    is_active: {
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
    },
    deletedAt: {
        field: 'deleted_at',
        type: Sequelize.DATE,
    },
},
{
    tableName: 'users',
    deletedAt: 'deleted_at',
    paranoid: true,
    timestamps: true,
    freezeTableName:true
});

Users.belongsTo(Role, {
    foreignKey: 'role_id'
});

Users.belongsTo(Kabupaten, {
    foreignKey: 'kab'
});



module.exports = Users;

