const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    text: { type: String, trim: true, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "chat" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("message", messageSchema);
