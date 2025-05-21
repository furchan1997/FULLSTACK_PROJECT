const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/login-log", (req, res, next) => {
  const logPath = path.join(__dirname, "../logs/login.log");

  fs.readFile(logPath, "utf8", (err, date) => {
    if (err) {
      return next(err);
    }

    res.send(date);
  });
});

module.exports = router;
