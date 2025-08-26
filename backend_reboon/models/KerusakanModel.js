const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const { DataTypes } = Sequelize;

const Kerusakan = db.define('kerusakan', {
    id_kerusakan: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
    },
    id_kejadian: {
        type: DataTypes.STRING
    },
    id_lokasi: {
        type: DataTypes.STRING
    },
    rumah_terdampak: {
        type: DataTypes.STRING
    },
    rm_rusak_ringan: {
        type: DataTypes.STRING
    },
    rm_rusak_sedang: {
        type: DataTypes.STRING
    },
    rm_rusak_berat: {
        type: DataTypes.STRING
    },
    sarana_pendidikan: {
        type: DataTypes.STRING
    },
    sarana_ibadah: {
        type: DataTypes.STRING
    },
    sarana_kesehatan: {
        type: DataTypes.STRING
    },
    perkantoran: {
        type: DataTypes.STRING
    },
    bangunan_lain: {
        type: DataTypes.STRING
    },
    jalan: {
        type: DataTypes.STRING
    },
    jembatan: {
        type: DataTypes.STRING
    },
    sawah: {
        type: DataTypes.STRING
    },
    kebun: {
        type: DataTypes.STRING
    },
    tambak: {
        type: DataTypes.STRING
    },
    irigasi: {
        type: DataTypes.STRING
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
});


module.exports = Kerusakan;

