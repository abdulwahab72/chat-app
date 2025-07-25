const User = require("../model/user");
const Message = require("../model/message");
const Chat = require("../model/chat");

const createChat = async (req, res) => {
  const { chatName, contactEmails, isGroupChat } = req.body;
  if (!chatName || !contactEmails || !Array.isArray(contactEmails)) {
    return res.status(400).json({
      success: false,
      message: "Chat name and Users are required",
    });
  }
  try {
    const loggedInUser = req.user._id;
    const usersFromContact = await User.find({ email: { $in: contactEmails } });
    const users = [loggedInUser, ...usersFromContact.map((user) => user._id)];
    const chat = new Chat({
      chatName,
      isGroupChat,
      users,
      groupAdmin: isGroupChat ? loggedInUser : null,
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

const getChat = async (req, res) => {
  try {
    const chats = await Chat.find({ users: req.user._id });
    res.status(200).json({
      success: true,
      message: "Chats fetched successfully",
      data: chats,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "failed to fetch chats",
    });
  }
};
const deleteChat = async (req, res) => {
  const { chatId } = req.params;
  try {
    const chat = await Chat.findByIdAndDelete(chatId);
    if (!chatId) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
module.exports = { createChat, getChat, deleteChat };
