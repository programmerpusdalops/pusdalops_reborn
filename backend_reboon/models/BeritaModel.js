const {Sequelize} = require("sequelize");
const db = require("../config/Database.js");

const {DataTypes} = Sequelize;

const Berita = db.define('berita', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    judul:{
        type: DataTypes.STRING,
    },
    kategori:{
      type: DataTypes.STRING,
    },
    tanggal:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    penulis:{
      type: DataTypes.STRING,
    },
    status:{
        type: DataTypes.STRING,
    },
    content:{
        type: DataTypes.TEXT,
      },
    image:{
      type: DataTypes.STRING,
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


module.exports = Berita;

