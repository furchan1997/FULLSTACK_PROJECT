const rateLimit = require("express-rate-limit");

const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: {
    error: "To many requests",
    message: "שלחת יותר מדי הודעות בזמן קצר. נסה שוב בעוד כמה דקות.",
  },
});

module.exports = contactLimiter;
