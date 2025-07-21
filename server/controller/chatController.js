const User = require("../model/user");
const Message = require("../model/message");
const Chat = require("../model/chat");

const createChat = async (req, res) => {
  const { chatName, users, isGroupChat } = req.body;
  if (!chatName || !users) {
    return res.status(400).json({
      success: false,
      message: "Chat and Users are required",
    });
  }
  try {
    const chat = new Chat({
      chatName,
      isGroupChat,
      users: users.map((user) => user._id),
      groupAdmin: null,
      latestMessage: null,
    });
    const saveChat = await chat.save();
    res.status(201).json({
      success: true,
      message: "Chat created successfully",
      data: saveChat,
    });
  } catch (e) {
    console.log("error", e);
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
};
module.exports = { createChat };
