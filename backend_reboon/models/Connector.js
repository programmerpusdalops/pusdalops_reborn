// const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");
const Kabupaten = require("./KabupatenModel");
const Kecamatan = require("./KecamatanModel");
const Kejadian = require("./KejadianBencanaModel");
const Kelurahan = require("./KelurahanModel");
const LokasiKejadian = require("./LokasiKejadianModel");
const JenisKejadian = require("./JenisKejadianModel");

JenisKejadian.hasMany(Kejadian, {
  foreignKey: "id_jenis_kejadian",
  as: "Kejadian"
});

Kejadian.belongsTo(JenisKejadian, {
  foreignKey: "id_jenis_kejadian",
  as: "JenisKejadian"
});

Kejadian.hasMany(LokasiKejadian, {
  foreignKey: "id_kejadian",
   as: "LokasiKejadians"
});

LokasiKejadian.belongsTo(Kabupaten, { foreignKey: "kab", as: "Kabupaten" });
LokasiKejadian.belongsTo(Kecamatan, { foreignKey: "kec", as: "Kecamatan" });
LokasiKejadian.belongsTo(Kelurahan, { foreignKey: "desa", as: "Kelurahan" });
// LokasiKejadian.belongsTo(Kabupaten, { foreignKey: "kab" });
// LokasiKejadian.belongsTo(Kecamatan, { foreignKey: "kec" });
// LokasiKejadian.belongsTo(Kelurahan, { foreignKey: "desa" });

LokasiKejadian.belongsTo(Kejadian, {
  foreignKey: "id_kejadian",
  as: "Kejadian"
});

module.exports = {
  Kejadian,
  LokasiKejadian,
  Kabupaten,
  Kecamatan,
  Kelurahan,
};