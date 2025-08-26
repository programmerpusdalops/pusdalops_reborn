const express = require('express');
const auth = require("../middleware/auth.js");
const {getJenisKejadian, getJenisKejadianById, PostJenisKejadian, updateJenisKejadian, deleteJenisKejadian } = require("../controllers/JenisKejadianController.js");

const router = express.Router();

router.get('/', getJenisKejadian);
router.get('/:id', getJenisKejadianById);
router.post('/', PostJenisKejadian);
router.patch('/:id', updateJenisKejadian);
router.delete('/:id', deleteJenisKejadian);

module.exports = router;