const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "Please add a Full Name"],
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please add an Email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid Email",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please add a Password"],
    },
    phone: {
      type: String,
      trim: true,
      required: [true, "Please add a Phone number"],
    },
    address: {
      type: String,
      trim: true,
      required: [true, "Please add an Address"],
    },
    employerId: {
      type: String,
      default: () => {
        const randomId = Math.floor(10000000 + Math.random() * 90000000);
        return randomId.toString();
      },
    },
    department: {
      type: String,
      trim: true,
      required: [true, "Please add a Department"],
    },
    dob: {
      type: Date,
      trim: true,
      required: [true, "Please add a Date of Birth"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: [true, "Please add a Gender"],
    },
    profileImage: {
      type: String,
    },
    duration: {
      type: String, // or you can use a different data type that suits your needs
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);
