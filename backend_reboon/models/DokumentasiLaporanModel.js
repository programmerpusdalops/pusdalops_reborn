const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
const LaporBencana = require("./LaporBencanaModel.js");

const { DataTypes } = Sequelize;

const DokumentasiLaporan = db.define('dokumentasi_laporan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_laporan: {
        type: DataTypes.INTEGER,
    },
    image: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    },
},
    {
        tableName: 'dokumentasi_laporan',
        freezeTableName: true,
    });

// Relasi
LaporBencana.hasMany(DokumentasiLaporan, { foreignKey: 'id_laporan', as: 'dokumentasi' });
DokumentasiLaporan.belongsTo(LaporBencana, { foreignKey: 'id_laporan', as: 'laporan' });

module.exports = DokumentasiLaporan;
