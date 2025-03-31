const express = require("express");
const router = express.Router();
const { validateUser, User } = require("../models/users");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const authMW = require("../middleware/auth");
const adminAndUserAuthMW = require("../middleware/checkAuth");
const adminAuthMW = require("../middleware/adminAuth");
const userAuthMW = require("../middleware/userAuth");

// יצירת משתמש חדש
router.post("/", async (req, res, next) => {
  try {
    // VALIDATE USER INPUT
    const { error } = validateUser(req.body, "generalSchema");
    if (error) {
      res
        .status(400)
        .json({ error: "Validation error", message: error.details[0].message });
      return;
    }

    // VALIDATE SYSTEM
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res
        .status(400)
        .json({ error: "Email conflict", message: "Email is already in use." });
      return;
    }

    // HASH THE PASSWORD
    const userPassword = await bcrypt.hash(req.body.password, 12);

    // CREATE NEW USER
    user = await new User({
      ...req.body,
      password: userPassword,
      isAdmin: false,
    }).save();

    // RESPONSE: Returning safe user details
    const response = _.pick(user, ["firstName", "lastName", "email"]);

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// קבלת המשתמשים על ידיי המנהל
router.get("/", authMW, adminAuthMW, async (req, res, next) => {
  try {
    const users = await User.find({}, {});

    if (!users || users.length === 0) {
      res
        .status(404)
        .json({ error: "Not found", message: "Users not found yet" });
      return;
    }

    res.json(users);
  } catch (error) {
    // Handling server error (500)
    next(error);
  }
});

// קבלת משתמש על פי המזהה שלו
router.get("/:id", authMW, adminAndUserAuthMW, async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res
        .status(404)
        .json({ error: "Not Found", message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

// מחיקת משתמש על ידיי מנהל
router.delete("/:id", authMW, adminAndUserAuthMW, async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });

    if (!user) {
      res.status(404).send("User not found.");
      return;
    }

    res.json({
      message: req.user.isAdmin ? "User deleted by admin." : "user delted",
      user,
    });
  } catch (error) {
    next(error);
  }
});

// עריכת פרטי משתמש קיים
router.put("/:id", authMW, userAuthMW, async (req, res, next) => {
  try {
    // VALIDATE USER INPUT
    const { error } = validateUser(req.body, "schemaForChange");

    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    // VALIDATE SYSTEM

    const currentDetails = await User.findById(req.params.id);

    if (!currentDetails) {
      res.status(404).send("User not found.");
      return;
    }

    // קודם עושים את הבדיקה האם קיים שדה אימייל ובנוסף האם האימייל החדש לא תואם את האיימיל הנוכחי
    //  האם האימייל החדש שהמשתמש הכניס תפוס על ידי משתמש אחר.
    if (req.body.email && req.body.email !== currentDetails.email) {
      const isEmailTaken = await User.findOne({ email: req.body.email });
      if (isEmailTaken) {
        res.status(400).json({
          message: "email busy.",
        });
        return;
      }
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });

    res.json({
      message: "User updated.",
      user,
    });
  } catch (error) {
    next(error);
  }
});

// שינוי סיסמא עבור משתמש קיים במערכת
router.patch("/:id", authMW, userAuthMW, async (req, res, next) => {
  try {
    // VALIDATE USER INPUT
    const { error } = validateUser(req.body, "schemaForChangePassword");
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    // VALIDATE SYSTEM
    const currentDetails = await User.findById(req.params.id);

    if (!currentDetails) {
      res.status(404).send("User not found.");
      return;
    }

    const chackPasswords = await bcrypt.compare(
      req.body.password,
      currentDetails.password
    );

    if (chackPasswords) {
      res.status(400).json({
        message:
          "The password is the same as the old one. Please enter a new password that meets the criteria in the field.",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newPassword = { password: hashedPassword };
    const user = await User.findByIdAndUpdate(req.params.id, newPassword, {
      returnDocument: "after",
    });

    res.json({
      message: "Password changed.",
      user,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
