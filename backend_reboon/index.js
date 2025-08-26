const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const db = require("./config/Database.js");

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

////
// const PembuatanTabel = require("./models/VideoAssetModel.js");
try {
  db.authenticate();
  console.log("Database connected...");
  // PembuatanTabel.sync();
} catch (error) {
  console.error("Connection error:", error);
}

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
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

// app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/public/images", express.static(path.join("public/images")));

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
// AKHIR URL API

const port = process.env.PORT || 5001;
app.listen(port);
console.log("Listening on localhost:" + port);
