const express = require("express");
const {
    getMajalahSearch,
    getMajalah,
    getMajalahById,
    postMajalah,
    updateMajalah,
    deleteMajalah,
} = require("../controllers/MajalahController.js");

const router = express.Router();

router.get("/search", getMajalahSearch);
router.get("/", getMajalah);
router.get("/:id", getMajalahById);
router.post("/", postMajalah);
router.patch("/:id", updateMajalah);
router.delete("/:id", deleteMajalah);

module.exports = router;
