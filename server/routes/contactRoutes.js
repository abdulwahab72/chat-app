const express = require("express");
const { protectMiddleware } = require("../middleware/index");
const router = express.Router();

const {
  addContact,
  getContact,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controller/contactController");

router.post("/add", protectMiddleware, addContact);
router.get("/get", protectMiddleware, getContact);
router.get("/get/:id", protectMiddleware, getContactById);
router.put("/update/:id", protectMiddleware, updateContact);
router.delete("/delete/:id", protectMiddleware, deleteContact);
module.exports = router;
