const Visitor = require("../../models/visitor");
const Staff = require("../../models/staff");
const ErrorResponse = require("../../utils/errorResponse");


// Check if a visitor has checked in or not
exports.checkVisitorCheckedIn = async (req, res, next) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return next(new ErrorResponse("Visitor not found", 404));
    }

    res.status(200).json({
      success: true,
      checkedIn: visitor.checkedIn,
    });
  } catch (error) {
    next(error);
  }
};