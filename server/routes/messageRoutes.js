const express = require("express");
const { protectMiddleware } = require("../middleware/index");
const router = express.Router();
const {
  createMessage,
  getMessages,
  updateMessage,
  deleteMessage,
} = require("../controller/messageController");

router.post("/create", protectMiddleware, createMessage);
router.get("/get", protectMiddleware, getMessages);
router.put("/update", protectMiddleware, updateMessage);
router.delete("/delete/:messageId", protectMiddleware, deleteMessage);
module.exports = router;
