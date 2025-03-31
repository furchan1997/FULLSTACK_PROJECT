// מידלוואר עבור הרשאות מנהל ומשתמש רשום
module.exports = (req, res, next) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) {
    res.status(403).json({ message: "Unauthorized access" });
    return;
  }

  next();
};
