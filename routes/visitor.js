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
  getInvitedVisitors,
  getNotInvitedVisitors,
} = require("../controllers/visitor");

router.post("/signup", createVisitor);
router.post("/signup/staff", createVisitorByStaff);
router.get("/visitor/:id", getVisitorById);
router.get("/allvisitor", allVisitor);
router.get("/visitor/:id/checkedin", checkVisitorCheckedIn);
router.patch("/visitor/:id/checkin", updateCheckInStatus);
router.get("/checked-in", getCheckedInVisitors);
router.get("/not-checked-in", getNotCheckedInVisitors);
router.get("/invited-visitor", getInvitedVisitors);
router.get("/not-invited-visitor", getNotInvitedVisitors);

module.exports = router;
