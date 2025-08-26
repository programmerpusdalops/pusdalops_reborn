const express = require('express');
const auth = require("../middleware/auth.js");
const {getLogpalSearch, getLogpalById, postLogpal, updateLogpal, deleteLogpal } = require("../controllers/LogpalController.js");

const router = express.Router();

router.get('/search', getLogpalSearch);
router.get('/:id', getLogpalById);
router.post('/', postLogpal);
router.patch('/:id', updateLogpal);
router.delete('/:id', deleteLogpal);

module.exports = router;