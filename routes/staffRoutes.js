const express = require("express");
const router = express.Router();
const {
  createStaff,
  login,
  inviteVisitor,
  getStaff,
  allStaff,
} = require("../controllers/staffController");

router.post("/signup", createStaff);
router.post("/login", login);
router.post("/invite", inviteVisitor);
router.get("/allStaff", allStaff); // Reordered route
router.get("/:staffId", getStaff);

module.exports = router;
