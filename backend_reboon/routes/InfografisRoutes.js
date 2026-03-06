const express = require("express");
const { getInfografisSearch, getInfografis, getInfografisById, postInfografis, updateInfografis, deleteInfografis } = require("../controllers/InfografisController.js");

const router = express.Router();

router.get("/", getInfografis);
router.get("/search", getInfografisSearch);
router.get("/:id", getInfografisById);
router.post("/", postInfografis);
router.patch("/:id", updateInfografis);
router.delete("/:id", deleteInfografis);

module.exports = router;
