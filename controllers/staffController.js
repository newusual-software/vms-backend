const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Staff = require("../models/staff");
const Visitor = require("../models/visitor");
const nodemailer = require("nodemailer");
const moment = require("moment");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.createStaff = async (req, res, next) => {
  try {
    // Get the staff data from the request body
    const {
      fullName,
      email,
      password,
      phone,
      address,
      employerId,
      department,
      dob,
      gender,
      profileImage,
    } = req.body;

    // Check if any required fields are missing
    if (
      !fullName ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !department ||
      !gender
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the staff
    const staff = await Staff.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      address,
      employerId,
      department,
      dob,
      gender,
      profileImage, // Assuming you are using a file upload middleware and storing the file path in req.file.path
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

    // Check if any required fields are missing
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Find the staff by email
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


exports.inviteVisitor = async (req, res, next) => {
  try {
    const { email, staffId, duration } = req.body;

    // Check if any required fields are missing
    if (!email || !staffId || !duration) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: email, staffId, and duration",
      });
    }

    // Check if the staff exists
    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    // Check if the visitor exists
    let visitor = await Visitor.findOne({ email });

    // If the visitor exists and has already been invited, return an error
    if (visitor && visitor.invited === true) {
      return res.status(400).json({
        success: false,
        message: "Visitor has already been invited",
      });
    }

    // If the visitor exists but has not been invited, update the fields
    if (visitor) {
      visitor.checkedIn = true;
      visitor.duration = duration;
      visitor.invited = true;
      visitor.staffId = staffId;
    } else {
      // Create a new visitor if the email is not found
      visitor = await Visitor.create({
        email,
        checkedIn: true,
        duration,
        invited: true,
        createdByStaff: true,
        staffAdminId: staffId,
      });
    }

    // Send email invite to the visitor
    const emailSubject = "Invitation to schedule a visit";
    const emailContent = `Dear Visitor, you are invited to schedule a visit. The visit duration is ${duration}. Please visit our website to schedule a visit.`;

    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "godsfavour1975@gmail.com",
        pass: "wgxlzkknrpdwofds",
      },
    });

    // Send mail with defined transport object
    await transporter.sendMail({
      from: "godsfavour1975@gmail.com",
      to: email,
      subject: emailSubject,
      text: emailContent,
    });

    // Save the updated visitor data
    await visitor.save();

    res.status(200).json({
      success: true,
      message: "Invitation sent successfully",
    });
  } catch (err) {
    next(err);
  }
};



exports.getStaff = async (req, res, next) => {
  try {
    // Get the staff ID from the request parameters
    const { staffId } = req.params;

    // Find the staff by ID
    const staff = await Staff.findById(staffId);

    // If the staff is not found, return an error
    if (!staff) {
      return res
        .status(404)
        .json({ success: false, message: "Staff not found" });
    }

    // Return the staff information
    res.status(200).json({ success: true, staff });
  } catch (err) {
    next(err);
  }
};

exports.allStaff = async (req, res, next) => {
  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;
  try {
    const count = await Staff.countDocuments({});
    const staff = await Staff.find()
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.status(200).json({
      success: true,
      staff,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  } catch (error) {
    next(new ErrorResponse("Server error", 500));
  }
};

exports.updateStaff = async (req, res, next) => {
  try {
    // Get the staff ID from the request parameters
    const { staffId } = req.params;

    // Find the staff by ID
    let staff = await Staff.findById(staffId);

    // If the staff is not found, return an error
    if (!staff) {
      return res
        .status(404)
        .json({ success: false, message: "Staff not found" });
    }

    // Get the updated staff data from the request body
    const {
      fullName,
      email,
      password,
      phone,
      address,
      employerId,
      department,
      dob,
      gender,
      profileImage,
    } = req.body;

    // Update the staff data
    staff.fullName = fullName || staff.fullName;
    staff.email = email || staff.email;
    staff.phone = phone || staff.phone;
    staff.address = address || staff.address;
    staff.employerId = employerId || staff.employerId;
    staff.department = department || staff.department;
    staff.dob = dob || staff.dob;
    staff.gender = gender || staff.gender;
    staff.profileImage = profileImage || staff.profileImage;

    // Update the password if it's provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      staff.password = hashedPassword;
    }

    // Save the updated staff data
    await staff.save();

    // Return the updated staff information
    res.status(200).json({ success: true, staff });
  } catch (err) {
    next(err);
  }
};
