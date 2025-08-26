const express = require("express");
const Register = require("../controllers/AuthController.js");
const Login = require("../controllers/AuthController.js");

const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);

module.exports = router;
