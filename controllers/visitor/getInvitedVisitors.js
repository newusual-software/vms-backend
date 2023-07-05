const Visitor = require("../../models/visitor");
const Staff = require("../../models/staff");
const ErrorResponse = require("../../utils/errorResponse");

//Get all invited visitors
exports.getInvitedVisitors = async (req, res, next) => {
  try {
    const invitedVisitors = await Visitor.find({ invited: true });

    res.status(200).json({
      success: true,
      visitors: invitedVisitors,
    });
  } catch (error) {
    next(new ErrorResponse("Server error", 500));
  }
};
