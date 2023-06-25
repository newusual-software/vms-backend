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
router.patch("/invite", inviteVisitor); // Updated to use PATCH method
router.get("/allStaff", allStaff);
router.get("/:staffId", getStaff);

module.exports = router;
