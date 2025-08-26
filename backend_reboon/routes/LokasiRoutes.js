const express = require('express');
const auth = require("../middleware/auth.js");
const { getKabupaten, getKecamatanByIdKab, getKelurahanByIdKec } = require("../controllers/LokasiController.js");


const router = express.Router();

router.get('/kab',  getKabupaten);
router.get('/kec/:id',  getKecamatanByIdKab);
router.get('/kal/:id',  getKelurahanByIdKec);


module.exports = router;