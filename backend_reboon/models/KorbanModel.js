const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
const KejadianBencana = require("./KejadianBencanaModel.js");

const {DataTypes} = Sequelize;

const Korban = db.define('korban', {
    id_korban: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
    },
    id_kejadian: {
        type: DataTypes.STRING,
    },
    id_lokasi: {
        type: DataTypes.STRING,
    },
    meninggal:{
        type: DataTypes.STRING,
    },
    luka_luka:{
        type: DataTypes.STRING,
    },
    sakit:{
        type: DataTypes.STRING,
    },
    hilang:{
        type: DataTypes.STRING,
    },
    menderita_kk:{
        type: DataTypes.STRING,
    },
    menderita_jiwa:{
        type: DataTypes.STRING,
    },
    mengungsi_kk:{
        type: DataTypes.STRING,
    },
    mengungsi_jiwa:{
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

Korban.belongsTo(KejadianBencana, {
    foreignKey: "id_kejadian",
  });

module.exports = Korban;

