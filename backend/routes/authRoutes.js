
const express = require("express");
const validateRegister = require("../middleware/validateRegister");

const router = express.Router();
const authController = require("../controllers/authController");



// Register API
router.post("/register", validateRegister, authController.register);

// Login API
router.post("/login", authController.login);

module.exports = router;
