const Visitor = require("../../models/visitor");
const Staff = require("../../models/staff");
const ErrorResponse = require("../../utils/errorResponse");

// Load all visitors
exports.allVisitor = async (req, res, next) => {
  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;
  try {
    const count = await Visitor.countDocuments({});
    const visitors = await Visitor.find()
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.status(200).json({
      success: true,
      visitors,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  } catch (error) {
    next(new ErrorResponse("Server error", 500));
  }
};
