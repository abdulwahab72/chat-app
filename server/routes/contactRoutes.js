const express = require("express");

const router = express.Router();

const { addContact, getContact } = require("../controller/contactController");

router.post("/add", addContact);
router.get("/get", getContact);

module.exports = router;
