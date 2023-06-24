const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const ErrorResponse = require("../utils/errorResponse");

// Create a new admin
exports.registerAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return next(new ErrorResponse("Admin already exists", 400));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin
    const admin = await Admin.create({ username, password: hashedPassword });

    // Generate JWT token
    const token = generateToken(admin._id);

    // Set the token as a cookie
    res.cookie("token", token, { httpOnly: true });

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
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Generate JWT token
    const token = generateToken(admin._id);

    // Set the token as a cookie
    res.cookie("token", token, { httpOnly: true });

    // Return admin data and token
    res.json({ success: true, admin, token });
  } catch (err) {
    next(err);
  }
};

// Admin dashboard
exports.dashboard = async (req, res, next) => {
  try {
    // Fetch admin data using the visitor ID
    const admin = await Admin.findById(req.visitor.id);

    // Check if admin exists
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Return admin data
    res.json(admin);
  } catch (err) {
    next(err);
  }
};

// Helper function to generate JWT token
const generateToken = (adminId) => {
  const payload = { id: adminId };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
};
