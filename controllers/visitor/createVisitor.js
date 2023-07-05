const Visitor = require("../../models/visitor");
const Staff = require("../../models/staff");
const ErrorResponse = require("../../utils/errorResponse");

// Create a visitor
exports.createVisitor = async (req, res, next) => {
  const { email } = req.body;
  try {
    const visitorExist = await Visitor.findOne({ email });

    if (visitorExist) {
      return next(
        new ErrorResponse("Visitor with this email already exists", 400)
      );
    }

    const visitor = await Visitor.create({
      ...req.body,
      createdByStaff: false,
    });

    res.status(201).json({
      success: true,
      visitor,
    });
  } catch (error) {
    next(error);
  }
};
