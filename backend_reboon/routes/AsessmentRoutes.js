const express = require("express");
const auth = require("../middleware/auth.js");
const { getLokasiByIdKejadian, postLokasi, updateLokasi } = require("../controllers/LokasiKejadianController.js");
const { getKerusakanByIdLokasi, postKerusakan, updateKerusakan } = require("../controllers/KerusakanController.js");
const { getKorbanByIdLokasi, postKorban, updateKorban, getCountKorbanTerdampak } = require("../controllers/KorbanController.js");
const { getSktdByIdKejadian, postSktd, updateSktd, deleteSktd } = require("../controllers/SktdController.js");

const { getDokumentasiByIdKejadian, postDokumentasi, postOneDokumentasi, deleteDokumentasi } = require("../controllers/DokumentasiController.js");

const router = express.Router();

// lokasi
router.get("/lokasi/:id", getLokasiByIdKejadian);
router.post("/lokasi", postLokasi);
router.patch("/lokasi/:id", updateLokasi);

// korban
router.get("/korban/countkorbanterdampak", getCountKorbanTerdampak);
router.get("/korban/:id", getKorbanByIdLokasi);
router.post("/korban", postKorban);
router.patch("/korban/:id", updateKorban);

// kerusakan
router.get("/kerusakan/:id", getKerusakanByIdLokasi);
router.post("/kerusakan", postKerusakan);
router.patch("/kerusakan/:id", updateKerusakan);

// Sktd
router.get("/sktd/:id", getSktdByIdKejadian);
router.post("/sktd", postSktd);
router.patch("/sktd/:id", updateSktd);
router.delete("/sktd/:id", deleteSktd);

// Dokumentasi
router.get("/dokumentasi/:id", getDokumentasiByIdKejadian);
router.post("/dokumentasi", postDokumentasi);
router.post("/dokumentasi/one", postOneDokumentasi);
router.delete("/dokumentasi/:id", deleteDokumentasi);

module.exports = router;
