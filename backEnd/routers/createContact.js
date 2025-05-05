const express = require("express");
const router = express.Router();
const {
  CreateContact,
  validateCreateContact,
} = require("../models/createContact");
const contactLimiter = require("../middleware/contactLimiter");

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

module.exports = router;
