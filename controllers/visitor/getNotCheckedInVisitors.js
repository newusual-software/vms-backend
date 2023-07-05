const Visitor = require("../../models/visitor");
const Staff = require("../../models/staff");
const ErrorResponse = require("../../utils/errorResponse");

// Get all visitors that are not checked in
exports.getNotCheckedInVisitors = async (req, res, next) => {
  try {
    const notCheckedInVisitors = await Visitor.find({ checkedIn: false });

    res.status(200).json({
      success: true,
      visitors: notCheckedInVisitors,
    });
  } catch (error) {
    next(new ErrorResponse("Server error", 500));
  }
};
