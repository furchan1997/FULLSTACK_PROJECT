const mongoose = require("mongoose");
const joi = require("joi");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    url: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO59DbN8_8JTIuLiyMOOWFde_rHdAG1CpRBA&s",
    },
    alt: { type: String, required: true },
  },
  category: {
    type: String,
    required: true,
    enum: ["קלפים", "נרות", "קמעות", "מפות", "תכשיטים", "אחר"],
  },
  quantityInStock: {
    type: Number,
    min: 0,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (val) => val.toLocaleString(), // מציג את התאריך בפורמט מקומי
    set: (val) => new Date(val), // מבצע המרה בעת שמירת התאריך
  },
});

productSchema.set("toJSON", { getters: true });

const Product = mongoose.model("Product", productSchema, "products");

// סכמת ג'וי עבור ולידציה

function validateProduct(product) {
  const schema = joi.object({
    name: joi.string().min(2).max(100).required(),
    description: joi.string().min(10).max(1000).required(),
    price: joi.number().min(0).required(),
    image: joi.object({
      url: joi.string().min(14).optional().allow("").default(""),
      alt: joi.string().min(2).max(1024).required(),
    }),
    category: joi
      .string()
      .valid("קלפים", "נרות", "קמעות", "מפות", "תכשיטים", "אחר")
      .required(),
    quantityInStock: joi.number().min(0).required(), // כמות במלאי
  });

  return schema.validate(product);
}

module.exports = {
  Product,
  validateProduct,
};
