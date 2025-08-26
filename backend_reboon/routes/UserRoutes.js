const express = require('express');
const auth = require("../middleware/auth.js");
const {getUsers, getUserById, postUser, updateUser, updateIsActive, deleteUser } = require("../controllers/UserController.js");

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', postUser);
router.patch('/:id', updateUser);
router.patch('/isActive/:id', updateIsActive);
router.delete('/:id', deleteUser);

module.exports = router;