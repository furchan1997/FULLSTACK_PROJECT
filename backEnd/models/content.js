const mongoose = require("mongoose");
const joi = require("joi");
const _ = require("lodash");
// סכמה עבור תוכן חדש
const contentSchema = new mongoose.Schema({
  sign: {
    type: String,
    enum: [
      "טלה", // Aries
      "שור", // Taurus
      "תאומים", // Gemini
      "סרטן", // Cancer
      "אריה", // Leo
      "בתולה", // Virgo
      "מאזניים", // Libra
      "עקרב", // Scorpio
      "קשת", // Sagittarius
      "גדי", // Capricorn
      "דלי", // Aquarius
      "דגים", // Pisces
    ],
    required: true,
  },
  title: {
    type: String,
    minlength: 2,
    maxlength: 256,
    required: true,
  },
  subtitle: {
    type: String,
    minlength: 2,
    maxlength: 1024,
    required: true,
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 1024,
    required: true,
  },

  image: {
    url: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO59DbN8_8JTIuLiyMOOWFde_rHdAG1CpRBA&s",
    },
    alt: {
      type: String,
      required: true,
    },
  },
  likes: {
    type: Array,
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// יצירת מודל חדש עבור תכנים
const Content = mongoose.model("Content", contentSchema, "contents");
// סכמת ג'וי עבור ולידציה
function validateContent(content) {
  const schema = joi.object({
    sign: joi.string().min(2).max(256).required(),
    title: joi.string().min(2).max(256).required(),
    subtitle: joi.string().min(2).max(1024).required(),
    description: joi.string().min(2).max(1024).required(),
    image: joi.object({
      url: joi.string().min(14).optional().allow("").default(""),
      alt: joi.string().min(2).max(1024).required(),
    }),
  });

  return schema.validate(content);
}

module.exports = {
  Content,
  validateContent,
};
