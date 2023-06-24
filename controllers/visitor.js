const Visitor = require("../models/visitor");
const ErrorResponse = require("../utils/errorResponse");

//load all users
exports.allVisitor = async (req, res, next) => {
  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Visitor.find({}).estimatedDocumentCount();

  try {
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
    next();
  } catch (error) {
    return next(new ErrorResponse("Server error", 500));
  }
};

exports.signup = async (req, res, next) => {
  const { email } = req.body;

  try {
    const visitorExist = await Visitor.findOne({ email });

    if (visitorExist) {
      return next(
        new ErrorResponse("Visitor with this email already exists", 400)
      );
    }

    const visitor = await Visitor.create(req.body);
    res.status(201).json({
      success: true,
      visitor,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// to fetch single user

exports.singleUser = async (req, res, next) => {
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