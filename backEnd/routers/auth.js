const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const joi = require("joi");
const { emailRegex } = require("../regex/regexSchema");
const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const fs = require("fs");
const path = require("path");

const logDir = "logs";
const logFilePath = path.join(logDir, "login.log");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

router.post("/login", async (req, res, next) => {
  try {
    // VALIDATE USER INPUT
    const { error } = validateUserExists(req.body);
    //  בשגיאות אימות
    if (error) {
      res.status(400).send({ message: error.details[0].message });
      return;
    }

    // VALIDATE SYSTEM
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send({ message: "Please check your input." });
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).send({ message: "Please check your input." });
      return;
    }

    // יצירת לוגר של משתמשים מחוברים

    user.lastLogin = new Date();
    await user.save();

    const log = `${user.firstName} ${user.lastName} ${
      req.ip
    }  ${new Date().toISOString()}\n`;

    fs.appendFileSync(logFilePath, log);

    // PROCESS
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      config.jwtKey
    );

    // RESPONSE
    res.json({
      token: token,
      id: user.id,
      name: user.firstName,
    });
  } catch (error) {
    next(error); // מעביר את השגיאה ל-Middleware השגיאות הגלובלי
  }
});
// סכמת ג'וי עבור ולדיציה להתחברות משתמש
function validateUserExists(user) {
  const schema = joi.object({
    email: joi.string().email().pattern(emailRegex).required(),
    password: joi.string().min(8).required(),
  });

  return schema.validate(user);
}

module.exports = router;
