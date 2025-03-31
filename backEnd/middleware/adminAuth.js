// מידלוואר עבור הרשאות מנהל בלבד

module.exports = (req, res, next) => {
  if (req.user.isAdmin !== true) {
    res
      .status(403)
      .json({ message: "Unauthorized access. Only admin action." });
    return;
  }

  next();
};
