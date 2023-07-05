const Visitor = require("../../models/visitor");
const Staff = require("../../models/staff");
const ErrorResponse = require("../../utils/errorResponse");

// Get all invited visitors
exports.getNotInvitedVisitors = async (req, res, next) => {
  try {
    const nonInvitedVisitors = await Visitor.find({ invited: false });

    res.status(200).json({
      success: true,
      visitors: nonInvitedVisitors,
    });
  } catch (error) {
    next(new ErrorResponse("Server error", 500));
  }
};
