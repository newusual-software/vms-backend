const express = require("express");
const router = express.Router();
const {
  createVisitor,
  createVisitorByStaff,
  getVisitorById,
  allVisitor,
  checkVisitorCheckedIn,
  updateCheckInStatus,
  getCheckedInVisitors,
  getNotCheckedInVisitors,
} = require("../controllers/visitor");

router.post("/signup", createVisitor);
router.post("/signup/staff", createVisitorByStaff);
router.get("/visitor/:id", getVisitorById);
router.get("/allvisitor", allVisitor);
router.get("/visitor/:id/checkedin", checkVisitorCheckedIn);
router.patch("/visitor/:id/checkin", updateCheckInStatus);
router.get("/checked-in", getCheckedInVisitors);
router.get("/not-checked-in", getNotCheckedInVisitors);

module.exports = router;
