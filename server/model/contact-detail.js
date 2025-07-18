const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});
module.exports = mongoose.model("contact", contactSchema);
