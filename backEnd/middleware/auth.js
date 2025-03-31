const jwt = require("jsonwebtoken");
const config = require("../config/config");

// מידלוואר עבור הרשמה של משתמש והרשאותיו

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    res
      .status(401)
      .json({ message: "Missing authentication token. Please log in." });
    return;
  }

  try {
    const payload = jwt.verify(token, config.jwtKey);
    req.user = payload;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token. Please log in again." });
    return;
  }
};
