const express = require("express");
const { protectMiddleware } = require("../middleware/index");
const router = express.Router();

const { addContact, getContact } = require("../controller/contactController");

router.post("/add", protectMiddleware, addContact);
router.get("/get", protectMiddleware, getContact);

module.exports = router;
