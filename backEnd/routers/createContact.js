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

router.delete("/delete", authMW, adminAuthMW, async (req, res, next) => {
  try {
    const messages = await CreateContact.deleteMany();
    if (messages.deletedCount === 0) {
      res.status(404).json({
        message: "No messages found yet.",
      });
      return;
    }

    res.json({
      message: "All the messages deleted.",
      data: messages,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:id", authMW, adminAuthMW, async (req, res, next) => {
  try {
    const message = await CreateContact.findOneAndDelete({
      _id: req.params.id,
    });

    if (!message) {
      res.status(404).json({
        message: "message not found.",
      });
      return;
    }

    res.json({
      message: "message deleted.",
      data: message,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
