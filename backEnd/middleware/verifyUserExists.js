const { User } = require("../models/users");

module.exports = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404).send("User not found.");
    return;
  }

  next();
};
