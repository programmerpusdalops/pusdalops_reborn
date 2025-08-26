const express = require('express');
const auth = require("../middleware/auth.js");
const {getBerita, getLatest, getLatestFour, getLatestFourRecommended, getLatestFourFavorit, getBeritaSearch, getBeritaById, postBerita, updateBerita, deleteBerita } = require("../controllers/BeritaController.js");

const router = express.Router();

router.get('/', getBerita);
router.get('/latest', getLatest);
router.get('/latest/four', getLatestFour);
router.get('/latest/recommended', getLatestFourRecommended);
router.get('/latest/favorit', getLatestFourFavorit);
router.get('/search', getBeritaSearch);
router.get('/:id', getBeritaById);
router.post('/', postBerita);
router.patch('/:id', updateBerita);
router.delete('/:id', deleteBerita);

module.exports = router;