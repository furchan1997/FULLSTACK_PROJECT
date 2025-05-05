const mongoose = require("mongoose");
const joi = require("joi");
const { phoneRegex } = require("../regex/regexSchema");

const createContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 256,
    required: true,
  },
  phone: {
    type: String,
    minlength: 9,
    maxlength: 11,
    required: true,
  },
  info: {
    type: String,
    minlength: 20,
    maxlength: 1256,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (val) => val.toLocaleString(), // מציג את התאריך בפורמט מקומי
    set: (val) => new Date(val), // מבצע המרה בעת שמירת התאריך
  },
});

createContactSchema.set("toJSON", { getters: true });

const CreateContact = mongoose.model(
  "CreateContact",
  createContactSchema,
  "createContacts"
);

function validateCreateContact(user) {
  const schema = joi.object({
    firstName: joi.string().min(2).max(256).required(),
    phone: joi.string().min(9).max(11).pattern(phoneRegex).required().messages({
      "string.min": "מספר הטלפון חייב להיות באורך של לפחות 9 תווים.",
      "string.max": "מספר הטלפון יכול להיות באורך של עד 11 תווים בלבד.",
      "string.pattern.base": "מספר הטלפון חייב להיות תקין לפי פורמט ישראלי.",
    }),
    info: joi.string().min(20).max(1256).required(),
  });

  return schema.validate(user);
}

module.exports = {
  CreateContact,
  validateCreateContact,
};
