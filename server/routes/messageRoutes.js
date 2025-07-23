const express = require("express");
const { protectMiddleware } = require("../middleware/index");
const router = express.Router();
const { createMessage } = require("../controller/messageController");

router.post("/create", protectMiddleware, createMessage);
module.exports = router;
