const express = require("express");
const auth = require("../middleware/auth.js");
const { getTipsSearch, getTips, getTipsById, postTips, updateTips, deleteTips } = require("../controllers/TipsBencanaController.js");

const router = express.Router();

router.get("/", getTips);
router.get("/search", getTipsSearch);
router.get("/:id", getTipsById);
router.post("/", postTips);
router.patch("/:id", updateTips);
router.delete("/:id", deleteTips);

module.exports = router;
