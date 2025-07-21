const express = require("express");
const router = express.Router();
const { createChat } = require("../controller/chatController");
router.post("/create", createChat);

module.exports = router;
