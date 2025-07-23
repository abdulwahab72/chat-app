const express = require("express");
const { protectMiddleware } = require("../middleware/index");
const router = express.Router();
const {
  createChat,
  getChat,
  deleteChat,
} = require("../controller/chatController");
router.post("/create", protectMiddleware, createChat);
router.get("/get", protectMiddleware, getChat);
router.delete("/delete/:chatId", protectMiddleware, deleteChat);
module.exports = router;
