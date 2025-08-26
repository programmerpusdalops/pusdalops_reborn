const express = require("express");
const auth = require("../middleware/auth.js");
const { getDokumenSearch, getDokumen, getDokumenById, postDokumen, updateDokumen, deleteDokumen } = require("../controllers/DokumenController.js");

const router = express.Router();

router.get("/", getDokumen);
router.get("/search", getDokumenSearch);
router.get("/:id", getDokumenById);
router.post("/", postDokumen);
router.patch("/:id", updateDokumen);
router.delete("/:id", deleteDokumen);

module.exports = router;
