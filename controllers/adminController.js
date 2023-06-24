const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin');
const Staff = require('../models/staff');

// Register a new admin
exports.registerAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin
    const admin = await Admin.create({ username, password: hashedPassword });

    // Generate JWT token
    const token = generateToken(admin._id);

    // Return admin data and token
    res.status(201).json({ success: true, admin, token });
  } catch (err) {
    next(err);
  }
};

// Admin login
exports.loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(admin._id);

    // Return admin data and token
    res.json({ success: true, admin, token });
  } catch (err) {
    next(err);
  }
};

// Helper function to generate JWT token
const generateToken = (adminId) => {
  const payload = { id: adminId };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
};

// Create a new staff
exports.createStaff = async (req, res, next) => {
  try {
    // Get the staff data from the request body
    const { name, position, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the staff
    const staff = await Staff.create({
      name,
      position,
      password: hashedPassword,
    });

    // Return the created staff
    res.status(201).json({ success: true, staff });
  } catch (err) {
    next(err);
  }
};
