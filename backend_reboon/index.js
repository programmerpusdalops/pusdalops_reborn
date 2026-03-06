const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const db = require("./config/Database.js");
const { config } = require("./config/env.js");

// url
const Auth = require("./routes/AuthRoutes.js");
const userRoutes = require("./routes/UserRoutes.js");
const roleRoutes = require("./routes/RoleRoutes.js");
const Asessment = require("./routes/AsessmentRoutes.js");
const KejadianBencana = require("./routes/KejadianBencanaRoutes.js");
const Dokumen = require("./routes/DokumenRoutes.js");
const JenisDokumen = require("./routes/JenisDokumenRoutes.js");
const JenisKejadian = require("./routes/JenisKejadianRoutes.js");
const Lokasi = require("./routes/LokasiRoutes.js");
const Berita = require("./routes/BeritaRoutes.js");
const Logpal = require("./routes/LogpalRoutes.js");
const VideoAsset = require("./routes/VideoAssetRoutes.js");
const Pengetahuan = require("./routes/PengetahuanRoutes.js");
const TipsBencana = require("./routes/TipsBencanaRoutes.js");
const KontakPenting = require("./routes/KontakPentingRoutes.js");
const Infografis = require("./routes/InfografisRoutes.js");
const LaporBencana = require("./routes/LaporBencanaRoutes.js");
const Majalah = require("./routes/MajalahRoutes.js");

////
// const PembuatanTabel = require("./models/VideoAssetModel.js");
(async () => {
  try {
    await db.authenticate();
    console.log("Database connected...");
    // PembuatanTabel.sync();
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
})();

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.use(cors({
  origin: config.corsOrigin,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "public", "images")));

// URL API
app.use("/auth", Auth);
app.use("/user", upload.single("file"), userRoutes);
app.use("/role", roleRoutes);
app.use("/asessment", upload.array("dokumentasi"), Asessment);
app.use("/kejadian", upload.single("file"), KejadianBencana);
app.use("/dokumen", upload.single("file"), Dokumen);
app.use("/jenisDokumen", JenisDokumen);
app.use("/jenisKejadian", JenisKejadian);
app.use("/lokasi", Lokasi);
app.use("/berita", upload.single("file"), Berita);
app.use("/logpal", Logpal);
app.use("/asset", VideoAsset);
app.use("/pengetahuan", upload.single("file"), Pengetahuan);
app.use("/tips_bencana", upload.single("file"), TipsBencana);
app.use("/kontak", KontakPenting);
app.use("/infografis", upload.single("file"), Infografis);
app.use("/laporan", upload.array("dokumentasi", 5), LaporBencana);
app.use("/majalah", upload.fields([{ name: "sampul", maxCount: 1 }, { name: "file_pdf", maxCount: 1 }]), Majalah);
// AKHIR URL API

app.listen(config.port);
console.log(`Server running on ${config.baseUrl}`);
