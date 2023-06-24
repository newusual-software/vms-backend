const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const Visitor = require("../models/visitor");

// Check if visitor is authenticated
exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.visitor = await Visitor.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

// Admin middleware
exports.isAdmin = (req, res, next) => {
  if (req.visitor.role === 0) {
    return next(new ErrorResponse("Access denied, you must be an admin", 401));
  }
  next();
};
