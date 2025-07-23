const Message = require("../model/message");
const User = require("../model/user");
const Chat = require("../model/chat");
const createMessage = async (req, res) => {
  try {
    const { chatId, text } = req.body;
    if (!chatId || !text) {
      return res.status(400).json({
        success: false,
        message: "Chat ID and text are required",
      });
    }
    let newMessage = new Message({
      text,
      sender: req.user._id,
      chat: chatId,
    });
    let savedMessage = await newMessage.save();
    savedMessage = await savedMessage.populate("sender", "userName email");
    savedMessage = await savedMessage.populate("chat");
    savedMessage = await User.populate(savedMessage, {
      path: "chat.users",
      select: "userName email",
    });
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: savedMessage,
    });
    res.status(201).json({
      success: true,
      message: "Message created successfully",
      data: savedMessage,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Failed to create message",
    });
  }
};
module.exports = { createMessage };
