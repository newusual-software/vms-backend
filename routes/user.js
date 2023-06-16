const express = require('express');
const router = express.Router();
const { signup, singleUser } = require("../controllers/visitor");

router.post('/signup', signup);
router.get("/visitor/:id", singleUser);

module.exports = router;
