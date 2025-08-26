const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
// const Users = require("./UserModel.js");

const JenisKejadian = require("./JenisKejadianModel.js");

const { DataTypes } = Sequelize;

const KejadianBencana = db.define("kejadian_bencana", {
  id_kejadian: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
  },
  id_jenis_kejadian: {
    type: DataTypes.STRING,
  },
  kronologis: {
    type: DataTypes.TEXT,
  },
  tanggal: {
    type: DataTypes.STRING,
  },
  jam: {
    type: DataTypes.STRING,
  },
  titik_lokasi: {
    type: DataTypes.STRING,
  },
  file_laporan_akhir: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
  status_ditangani: {
    type: DataTypes.STRING,
  },
  verification: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    field: "created_at",
    type: Sequelize.DATE,
  },
  updatedAt: {
    field: "updated_at",
    type: Sequelize.DATE,
  },
  deletedAt: {
    field: "deleted_at",
    type: Sequelize.DATE,
  },
  ket: {
    type: DataTypes.STRING,
  },
});

KejadianBencana.belongsTo(JenisKejadian, {
  foreignKey: "id_jenis_kejadian",
});

module.exports = KejadianBencana;
