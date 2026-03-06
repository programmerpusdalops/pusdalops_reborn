const express = require("express");
const rateLimiter = require("../middleware/rateLimiter.js");
const {
    postLaporan,
    getDashboardStats,
    getLaporanSearch,
    getLaporanById,
    updateStatus,
    deleteLaporan,
    trackLaporan,
} = require("../controllers/LaporBencanaController.js");

const router = express.Router();

// Public - rate limited
router.post("/", rateLimiter(3, 10 * 60 * 1000), postLaporan);
router.get("/track/:tiket", trackLaporan);

// Admin
router.get("/stats", getDashboardStats);
router.get("/search", getLaporanSearch);
router.get("/:id", getLaporanById);
router.patch("/:id", updateStatus);
router.delete("/:id", deleteLaporan);

module.exports = router;
