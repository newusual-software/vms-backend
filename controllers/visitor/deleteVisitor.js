const Visitor = require("../../models/visitor");
const ErrorResponse = require("../../utils/errorResponse");

exports.deleteVisitor = async (req, res, next) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return next(new ErrorResponse("Visitor not found", 404));
    }

    await Visitor.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Visitor deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
