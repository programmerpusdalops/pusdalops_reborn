const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const { DataTypes } = Sequelize;

const LaporBencana = db.define('lapor_bencana', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomor_tiket: {
        type: DataTypes.STRING,
        unique: true,
    },
    jenis_kejadian: {
        type: DataTypes.STRING,
    },
    tanggal_kejadian: {
        type: DataTypes.DATEONLY,
    },
    jam_kejadian: {
        type: DataTypes.STRING,
    },
    kronologi: {
        type: DataTypes.TEXT,
    },
    latitude: {
        type: DataTypes.DOUBLE,
    },
    longitude: {
        type: DataTypes.DOUBLE,
    },
    alamat_lokasi: {
        type: DataTypes.STRING,
    },
    korban_meninggal: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    korban_luka: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    korban_hilang: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    pengungsi: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    rumah_rusak: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    jalan_rusak: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    jembatan_rusak: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    fasilitas_umum_rusak: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    sekolah_terdampak: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    dampak_lainnya: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    nama_pelapor: {
        type: DataTypes.STRING,
    },
    no_hp: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bersedia_dihubungi: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Menunggu Verifikasi',
    },
    catatan_admin: {
        type: DataTypes.TEXT,
        allowNull: true,
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
        tableName: 'lapor_bencana',
        freezeTableName: true,
    });

module.exports = LaporBencana;
