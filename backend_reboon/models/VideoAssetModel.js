const {Sequelize} = require("sequelize");
const db = require("../config/Database.js");

const {DataTypes} = Sequelize;

const VideoAsset = db.define('asset_video', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    url:{
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


module.exports = VideoAsset;

