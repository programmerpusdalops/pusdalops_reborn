const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const Kabupaten = require("./KabupatenModel.js");
const Kecamatan = require("./KecamatanModel.js");
const Kelurahan = require("./KelurahanModel.js");

const { DataTypes } = Sequelize;

const LokasiKejadian = db.define("lokasi_kejadian", {
  id_lokasi: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  id_kejadian: {
    type: DataTypes.STRING,
  },
  kab: {
    type: DataTypes.STRING,
  },
  kec: {
    type: DataTypes.STRING,
  },
  desa: {
    type: DataTypes.STRING,
  },
  dusun: {
    type: DataTypes.STRING,
  },
  lat: {
    type: DataTypes.STRING,
  },
  long: {
    type: DataTypes.STRING,
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
});

LokasiKejadian.belongsTo(Kabupaten, {
  foreignKey: "kab",
});

LokasiKejadian.belongsTo(Kecamatan, {
  foreignKey: "kec",
});

LokasiKejadian.belongsTo(Kelurahan, {
  foreignKey: "desa",
});

module.exports = LokasiKejadian;
