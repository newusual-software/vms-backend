const express = require('express');
const router = express.Router();
const { signup, singleUser, allVisitor } = require("../controllers/visitor");

router.post('/signup', signup);
router.get("/visitor/:id", singleUser);
router.get("/allvisitor", allVisitor);

module.exports = router;
