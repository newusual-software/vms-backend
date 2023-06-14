const User = require("../models/user");

exports.signup = async (req, res, next) => {
  try {
    // Check if the 'email' property exists in the request body
    if (!req.body.email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    const { email } = req.body;
    console.log(email);

    try {
      const user = await User.create(req.body);
      res.status(201).json({
        success: true,
        user
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
