const Contact = require("../model/contact-detail");

const addContact = async (req, res) => {
  try {
    const { name, number, email } = req.body;
    const emailExist = await Contact.findOne({ email });
    const numberExist = await Contact.findOne({ number });
    if (emailExist || numberExist) {
      return res.status(400).json({
        success: false,
        message: "This contact has already exist",
      });
    }
    const newContact = new Contact({ name, number, email });
    await newContact.save();
    res.status(201).json({
      success: true,
      message: "User added successfully",
      data: newContact,
    });
  } catch (e) {
    console.log("error", e);
    return res.status(500).json({
      success: false,
      error: e.message,
    });
  }
};
const getContact = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      success: true,
      message: "Contacts fetch successfully.",
      data: contacts,
    });
  } catch (e) {
    console.log("error", e);
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
};
const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, number, email } = req.body;
  try {
    const contact = await Contact.findByIdAndUpdate(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    contact.name = name || contact.name;
    contact.number = number || contact.number;
    contact.email = email || contact.email;
    await contact.save();
    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: contact,
    });
  } catch (e) {
    console.log("error", e);
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
};
const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
      data: contact,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
module.exports = { addContact, getContact, updateContact, deleteContact };
