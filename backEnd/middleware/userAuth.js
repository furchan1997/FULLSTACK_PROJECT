// מידלוואר עבור משתמש רשום והרשאותיו
module.exports = (req, res, next) => {
  if (req.user.id !== req.params.id) {
    res.status(403).json({ message: "Unauthorized access" });
    return;
  }

  next();
};
