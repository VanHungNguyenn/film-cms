const express = require("express");
var router = express.Router();
const controller = require("../../controllers/feedback.controller");
router.post("/add", controller.Add);
module.exports = router;