const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Staff = require("../models/staff");
 // Assuming you have a Staff model

exports.createStaff = async (req, res, next) => {
  try {
    // Get the staff data from the request body
    const { email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the staff
    const staff = await Staff.create({
      email,  
      password: hashedPassword,
    });

    // Return the created staff
    res.status(201).json({ success: true, staff });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    // Get the login credentials from the request body
    const { email, password } = req.body;

    // Find the staff by name
    const staff = await Staff.findOne({ email });

    // If the staff is not found, return an error
    if (!staff) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, staff.password);

    // If the passwords don't match, return an error
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: staff._id, name: staff.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Return the token
    res.status(200).json({ success: true, token });
  } catch (err) {
    next(err);
  }
};
