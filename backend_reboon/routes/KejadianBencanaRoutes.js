const express = require('express');
const auth = require("../middleware/auth.js");
const { getCountKejadian, getCountKorbanTerdampak, getCountKejadianPerTahun, getCountKejadianPerJenisKejadian, getCountKejadianPerWilayah, getKejadianPerJenisKejadian, getPersentaseKejadian, getKejadianSearch, getKejadian, getKejadianById, getKejadianByIdUser, postKejadian, updateKejadian, deleteKejadian, getKejadianForUpdate, getKejadianPerTahun } = require( "../controllers/KejadianBencanaController.js");

const router = express.Router();
// Kejadian

router.get('/count/kejadian', getCountKejadian);
router.get('/count/terdampak', getCountKorbanTerdampak);
router.get('/persentase', getPersentaseKejadian);
router.get('/count/tahun', getCountKejadianPerTahun);
router.get('/count/jenis', getCountKejadianPerJenisKejadian);
router.get('/count/wilayah', getCountKejadianPerWilayah);
router.get('/jenis', getKejadianPerJenisKejadian);
router.get('/search', getKejadianSearch);
router.get('/', getKejadian);
router.get('/update/:id', getKejadianForUpdate);
router.get('/:id', getKejadianById);
router.get('/user/:id', getKejadianByIdUser);
router.post('/', postKejadian);
router.patch('/:id', updateKejadian);
router.delete('/:id', deleteKejadian);

router.get('/kejadian-per-tahun', getKejadianPerTahun);
module.exports = router;