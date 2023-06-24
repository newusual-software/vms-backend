const express = require("express");
const staffController = require("../controllers/staffController");
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Register a new admin
router.post("/register", staffController.createStaff);

// Admin login
router.post("/login", staffController.login);

module.exports = router;
