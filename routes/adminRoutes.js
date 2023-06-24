const express = require('express');
const adminController = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Register a new admin
router.post('/register', adminController.registerAdmin);

// Admin login
router.post('/login', adminController.loginAdmin);

// Create a new staff
router.post('/staffs', isAuthenticated, isAdmin, adminController.createStaff);

module.exports = router;
