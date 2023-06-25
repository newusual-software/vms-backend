const express = require("express");
const router = express.Router();
const {
  createVisitor,
  createVisitorByStaff,
  getVisitorById,
  allVisitor,
  checkVisitorCheckedIn,
  updateCheckInStatus,
} = require("../controllers/visitor");

router.post("/signup", createVisitor);
router.post("/signup/staff", createVisitorByStaff);
router.get("/visitor/:id", getVisitorById);
router.get("/allvisitor", allVisitor);
router.get("/visitor/:id/checkedin", checkVisitorCheckedIn);
router.patch("/visitor/:id/checkin", updateCheckInStatus);

module.exports = router;
