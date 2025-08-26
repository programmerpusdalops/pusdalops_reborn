const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const JenisDokumen = require("./JenisDokumenModel.js")

const {DataTypes} = Sequelize;

const Dokumen = db.define('dokumen', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    judul:{
        type: DataTypes.STRING,
    },
    id_jenis_dokumen:{
      type: DataTypes.STRING,
    },
    tahun:{
      type: DataTypes.STRING,
    },
    file_name:{
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

Dokumen.belongsTo(JenisDokumen, {
  foreignKey: 'id_jenis_dokumen'
});

module.exports = Dokumen;
