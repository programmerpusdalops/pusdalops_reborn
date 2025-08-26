const express = require('express');
const auth = require("../middleware/auth.js");
const { getVideoAssetLimit, getVideoAsset, postVideoAsset, deleteVideoAsset } = require("../controllers/VideoAssetController.js");

const router = express.Router();

router.get('/limit', getVideoAssetLimit);
router.get('/', getVideoAsset);
router.post('/', postVideoAsset);
router.delete('/:id', deleteVideoAsset);

module.exports = router;