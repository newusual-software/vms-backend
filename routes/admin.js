const express = require("express");
const adminController = require("../controllers/adminController");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");

const router = express.Router();

// Register a new admin
router.post("/register", adminController.registerAdmin);

// Login as an admin
router.post("/login", adminController.loginAdmin);

// Example admin route
router.get("/dashboard", isAuthenticated, isAdmin, adminController.dashboard);

module.exports = router;