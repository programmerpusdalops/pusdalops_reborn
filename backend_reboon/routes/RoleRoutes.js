const express = require('express');
const auth = require("../middleware/auth.js");
const { getRole, getRoleById, postRole, updateRole, deleteRole } = require("../controllers/RoleController.js");
const { getRoleAccessById, postRoleAccess, updateRoleAccess} = require("../controllers/RoleAccessController.js");

const router = express.Router();

router.get('/', getRole);
router.get('/:id', getRoleById);
router.post('/', postRole);
router.patch('/:id', updateRole);
router.delete('/:id', deleteRole);

router.get('/access/:id', getRoleAccessById);
router.post('/access', postRoleAccess);
router.patch('/access/:id', updateRoleAccess);


module.exports = router;