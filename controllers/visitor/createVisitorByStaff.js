const Visitor = require("../../models/visitor");
const Staff = require("../../models/staff");
const ErrorResponse = require("../../utils/errorResponse");

// Create a visitor by staff admin
exports.createVisitorByStaff = async (req, res, next) => {
  const { email, staffAdminId } = req.body;
  try {
    const visitorExist = await Visitor.findOne({ email });

    if (visitorExist) {
      return next(
        new ErrorResponse("Visitor with this email already exists", 400)
      );
    }

    const staffAdmin = await Staff.findById(staffAdminId);
    if (!staffAdmin) {
      return next(new ErrorResponse("Staff admin not found", 404));
    }

    const visitor = await Visitor.create({
      ...req.body,
      createdByStaff: true,
      staffAdminId,
    });

    res.status(201).json({
      success: true,
      visitor,
    });
  } catch (error) {
    next(error);
  }
};
