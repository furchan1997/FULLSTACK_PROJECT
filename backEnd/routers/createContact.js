const express = require("express");
const router = express.Router();
const {
  CreateContact,
  validateCreateContact,
} = require("../models/createContact");
const contactLimiter = require("../middleware/contactLimiter");
const authMW = require("../middleware/auth");
const adminAuthMW = require("../middleware/adminAuth");

router.post("/", contactLimiter, async (req, res, next) => {
  try {
    const { error } = validateCreateContact(req.body);

    if (error) {
      res
        .status(400)
        .json({ error: "Validation error", message: error.details[0].message });
      return;
    }

    const createContact = new CreateContact({
      ...req.body,
    });

    await createContact.save();

    res.status(201).json({
      message: "The message from the client created successfully.",
      info: createContact,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", authMW, adminAuthMW, async (req, res, next) => {
  try {
    const messages = await CreateContact.find().sort({ createdAt: -1 });
    res.json({
      messages: messages,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
