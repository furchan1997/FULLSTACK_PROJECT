const { User } = require("../models/users");
const userAdmin = require("./adminDetalis");
const bcrypt = require("bcrypt");

// פונקציה ליצירת מנהל אתר באופן אוטומטי והגנה מפני יצירת מנהלים נוספים
async function createAdmin() {
  const adminCreated = await User.findOne({ isAdmin: true });
  if (!adminCreated) {
    const hashedPassword = await bcrypt.hash(userAdmin.password, 12);

    await new User({
      ...userAdmin,
      password: hashedPassword,
      isAdmin: true,
    }).save();

    console.log("admin Created.");
  }
  const adminRestriction = await User.find({ isAdmin: true });
  if (adminRestriction.length > 1) {
    new Error({
      message: "More than one admin found. Restricting further creation.",
    });
    return;
  }
}

createAdmin();
