const express = require('express');
const auth = require("../middleware/auth.js");
const {getJenisDokumen, getJenisDokumenById, PostJenisDokumen, updateJenisDokumen, deleteJenisDokumen } = require("../controllers/JenisDokumenController.js");

const router = express.Router();

router.get('/', getJenisDokumen);
router.get('/:id', getJenisDokumenById);
router.post('/', PostJenisDokumen);
router.patch('/:id', updateJenisDokumen);
router.delete('/:id', deleteJenisDokumen);

module.exports = router;