const express = require("express");
const { protectMiddleware } = require("../middleware/index");
const router = express.Router();
const {
  createMessage,
  getMessages,
} = require("../controller/messageController");

router.post("/create", protectMiddleware, createMessage);
router.get("/get", protectMiddleware, getMessages);
module.exports = router;
