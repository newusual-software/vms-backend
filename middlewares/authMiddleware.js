const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
exports.isAuthenticated = (req, res, next) => {
  // Check if the user is authenticated (e.g., using JWT)
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Set the visitor ID in the request object
    req.visitor = { id: decoded.id };

    // Proceed to the next middleware/route handler
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Middleware to check if the user is an admin
exports.isAdmin = (req, res, next) => {
    // Check if the user is an admin (e.g., by checking the role field in the JWT payload)
    const { role } = req.user;
  
    if (role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    // If the user is an admin, proceed to the next middleware/route handler
    next();
  };
