const express = require("express");
const { getKontakSearch, getKontak, getKontakById, postKontak, updateKontak, deleteKontak } = require("../controllers/KontakPentingController.js");

const router = express.Router();

router.get("/", getKontak);
router.get("/search", getKontakSearch);
router.get("/:id", getKontakById);
router.post("/", postKontak);
router.patch("/:id", updateKontak);
router.delete("/:id", deleteKontak);

module.exports = router;
