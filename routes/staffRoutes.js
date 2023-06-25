const express = require("express");
const router = express.Router();
const { createStaff, login, inviteVisitor } = require("../controllers/staffController");

router.post("/signup", createStaff);
router.post("/login", login);
router.post("/invite", inviteVisitor);

module.exports = router;
