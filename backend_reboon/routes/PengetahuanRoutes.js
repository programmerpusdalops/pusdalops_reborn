const express = require('express');
const auth = require("../middleware/auth.js");
const {getPengetahuan, getLatest, getLatestFour, getLatestFourRecommended, getLatestFourFavorit, getPengetahuanSearch, getPengetahuanById, postPengetahuan, updatePengetahuan, deletePengetahuan } = require("../controllers/PengetahuanController.js");

const router = express.Router();

router.get('/', getPengetahuan);
router.get('/latest', getLatest);
router.get('/latest/four', getLatestFour);
router.get('/latest/recommended', getLatestFourRecommended);
router.get('/latest/favorit', getLatestFourFavorit);
router.get('/search', getPengetahuanSearch);
router.get('/:id', getPengetahuanById);
router.post('/', postPengetahuan);
router.patch('/:id', updatePengetahuan);
router.delete('/:id', deletePengetahuan);

module.exports = router;