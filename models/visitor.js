const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const visitorSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      default: () => {
        const currentYear = new Date().getFullYear().toString().substr(-2);
        const randomDigits = Math.floor(Math.random() * 900) + 100;
        return `NU${currentYear}A/${randomDigits}`;
      },
    },
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
    phoneNumber: {
      type: String,
      trim: true,
      required: [true, "Please add a Phone Number"],
      unique: true,
    },
    date: {
      type: String,
      trim: true,
      required: [true, "Please add a Date"],
    },
    time: {
      type: String,
      trim: true,
      required: [true, "Please add a Time"],
    },
    purposeOfVisit: {
      type: String,
      trim: true,
      required: [true, "Please add a Purpose of Visit"],
    },
    checkedIn: {
      type: Boolean,
      default: false,
    },
    createdByStaff: {
      type: Boolean,
      default: false,
    },
    staffAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

visitorSchema.index({ date: 1, time: 1 }, { unique: true });

visitorSchema.methods.jwtGenerateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
};

module.exports = mongoose.model("Visitor", visitorSchema);
