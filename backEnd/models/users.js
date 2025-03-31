const mongoose = require("mongoose");
const joi = require("joi");
const {
  emailRegex,
  passwordRegex,
  phoneRegex,
} = require("../regex/regexSchema");
// סכמה עבור משתמש חדש
const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 256,
    required: true,
  },

  lastName: {
    type: String,
    minlength: 2,
    maxlength: 256,
    required: true,
  },

  email: {
    type: String,
    minlength: 9,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    minlength: 8,
    required: true,
  },

  phone: {
    type: String,
    minlength: 9,
    maxlength: 11,
    required: true,
  },

  address: {
    state: {
      type: String,
      required: false,
      default: "",
    },
    country: {
      type: String,
      minlength: 2,
      maxlength: 256,
      required: true,
    },
    city: {
      type: String,
      minlength: 2,
      maxlength: 256,
      required: true,
    },
    street: {
      type: String,
      minlength: 2,
      maxlength: 256,
      required: true,
    },
    houseNumber: {
      type: Number,
      min: 2,
      max: 256,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
      min: 1,
      max: 9_999_999_999,
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  isAdmin: {
    default: false,
    type: Boolean,
  },
});
// יצירת מודל עבור משתמש
const User = mongoose.model("User", usersSchema, "users");
// סכמת ג'וי עבור ולידציה
function validateUser(user, action) {
  // סכמה עבור הרשמה
  const schemas = {
    generalSchema: joi.object({
      firstName: joi.string().min(2).max(256).required(),
      lastName: joi.string().min(2).max(256).required(),
      email: joi.string().email().pattern(emailRegex).required(),
      password: joi.string().min(8).pattern(passwordRegex).required(),
      phone: joi
        .string()
        .min(9)
        .max(11)
        .pattern(phoneRegex)
        .required()
        .messages({
          "string.min": "מספר הטלפון חייב להיות באורך של לפחות 9 תווים.",
          "string.max": "מספר הטלפון יכול להיות באורך של עד 11 תווים בלבד.",
          "string.pattern.base":
            "מספר הטלפון חייב להיות תקין לפי פורמט ישראלי.",
        }),

      address: joi
        .object({
          state: joi.string().min(2).max(256).optional().allow("").default(""),
          country: joi.string().min(2).max(256).required(),
          city: joi.string().min(2).max(256).required(),
          street: joi.string().min(2).max(256).required(),
          houseNumber: joi.number().required(),
          zip: joi.number().required(),
        })
        .required(),
    }),
    // סכמה עבור עריכת פרטי משתמש
    schemaForChange: joi.object({
      firstName: joi.string().min(2).max(256).required(),
      lastName: joi.string().min(2).max(256).required(),
      email: joi.string().email().pattern(emailRegex).required(),
      phone: joi
        .string()
        .min(9)
        .max(11)
        .pattern(phoneRegex)
        .required()
        .messages({
          "string.min": "מספר הטלפון חייב להיות באורך של לפחות 9 תווים.",
          "string.max": "מספר הטלפון יכול להיות באורך של עד 11 תווים בלבד.",
          "string.pattern.base":
            "מספר הטלפון חייב להיות תקין לפי פורמט ישראלי.",
        }),

      address: joi
        .object({
          state: joi.string().min(2).max(256).allow("").default(""),
          country: joi.string().min(2).max(256).required(),
          city: joi.string().min(2).max(256).required(),
          street: joi.string().min(2).max(256).required(),
          houseNumber: joi.number().required(),
          zip: joi.number().required(),
        })
        .required(),
    }),
    // סכמה עבור עדכון סיסמת המשתמש
    schemaForChangePassword: joi.object({
      password: joi
        .string()
        .min(8)
        .pattern(passwordRegex)
        .rule({
          message:
            '"password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-', // הודעת שגיאה עבור סיסמה לא תקנית
        })
        .required(),
    }),
  };
  //  בחירת הסכמה לפי הפעולה שנעשית
  const schema = schemas[action];

  // אם לא קיימת הסכמה כזאת עבור הפעולה
  if (!schema) {
    throw new Error("Invalid action type");
  }

  // מחזיר את תוצאת הוולידציה
  return schema.validate(user);
}

module.exports = {
  User,
  validateUser,
};
