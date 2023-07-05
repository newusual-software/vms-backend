const express = require("express");
const router = express.Router();




const { allVisitor } = require("../controllers/visitor/allVisitors");
const {
  checkVisitorCheckedIn,
} = require("../controllers/visitor/checkVisitorCheckIn");
const { createVisitor } = require("../controllers/visitor/createVisitor");
const {createVisitorByStaff} = require("../controllers/visitor/createVisitorByStaff");
const {
  getVisitorById
} = require("../controllers/visitor/getSingleVisitor");
const {
  updateCheckInStatus
} = require("../controllers/visitor/updateCheckIn");
const {
  getCheckedInVisitors
} = require("../controllers/visitor/getCheckedInVisitors");
const {
  getNotCheckedInVisitors
} = require("../controllers/visitor/getNotCheckedInVisitors");
const {
  getInvitedVisitors
} = require("../controllers/visitor/getInvitedVisitors");
const {
  getNotInvitedVisitors
} = require("../controllers/visitor/getNotInvitedVisitors");
const { deleteVisitor } = require("../controllers/visitor/deleteVisitor");



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
router.delete("/visitor/:id", deleteVisitor);

module.exports = router;
