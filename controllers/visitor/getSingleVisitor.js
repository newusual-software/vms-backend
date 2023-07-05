const Visitor = require("../../models/visitor");
const Staff = require("../../models/staff");
const ErrorResponse = require("../../utils/errorResponse");

// Get a single visitor by ID
exports.getVisitorById = async (req, res, next) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return next(new ErrorResponse("Visitor not found", 404));
    }

    res.status(200).json({
      success: true,
      visitor,
    });
  } catch (error) {
    next(error);
  }
};