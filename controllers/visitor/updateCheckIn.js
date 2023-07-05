const Visitor = require("../../models/visitor");
const Staff = require("../../models/staff");
const ErrorResponse = require("../../utils/errorResponse");

// Update check-in status of a visitor
exports.updateCheckInStatus = async (req, res, next) => {
  const { id } = req.params;
  const { checkedIn } = req.body;

  try {
    const visitor = await Visitor.findById(id);

    if (!visitor) {
      return next(new ErrorResponse("Visitor not found", 404));
    }

    visitor.checkedIn = checkedIn;
    await visitor.save();

    res.status(200).json({
      success: true,
      visitor,
    });
  } catch (error) {
    next(error);
  }
};
