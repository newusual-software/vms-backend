const express = require("express");
const router = express.Router();
const {
  createStaff,
  login,
  inviteVisitor,
  getStaff,
  allStaff,
  updateStaff, // Add the updateStaff function
} = require("../controllers/staffController");

router.post("/signup", createStaff);
router.post("/login", login);
router.patch("/invite", inviteVisitor);
router.get("/allStaff", allStaff);
router.get("/:staffId", getStaff);
router.put("/:staffId", updateStaff); // Add the updateStaff route

module.exports = router;
