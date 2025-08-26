const {Sequelize} = require("sequelize");
const db = require("../config/Database.js");

const {DataTypes} = Sequelize;

const Logpal = db.define('logpal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_barang:{
        type: DataTypes.STRING,
    },
    stok:{
      type: DataTypes.STRING,
    },
    satuan:{
      type: DataTypes.STRING,
    },
    tahun:{
      type: DataTypes.STRING,
    },
    sumber:{
      type: DataTypes.STRING,
    },
    kondisi:{
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

module.exports = Logpal;

