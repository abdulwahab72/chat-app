const express = require("express");
const { protectMiddleware } = require("../middleware/index");
const router = express.Router();
const { createChat, getChat } = require("../controller/chatController");
router.post("/create", protectMiddleware, createChat);
router.get("/get", protectMiddleware, getChat);
module.exports = router;
