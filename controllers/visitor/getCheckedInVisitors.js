const Visitor = require("../../models/visitor");
const Staff = require("../../models/staff");
const ErrorResponse = require("../../utils/errorResponse");

// Get all checked-in visitors
exports.getCheckedInVisitors = async (req, res, next) => {
  try {
    const checkedInVisitors = await Visitor.find({ checkedIn: true });

    res.status(200).json({
      success: true,
      visitors: checkedInVisitors,
    });
  } catch (error) {
    next(new ErrorResponse("Server error", 500));
  }
};
