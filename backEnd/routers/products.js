const express = require("express");
const router = express.Router();
const authMW = require("../middleware/auth");
const adminAuthMW = require("../middleware/adminAuth");
const { Product, validateProduct } = require("../models/product");

// קבלת מוצרים
router.get("/products", async (req, res, next) => {
  const products = await Product.find({}).sort({ createdAt: -1 });

  if (products.length === 0) {
    res.send("No products yet.");
    return;
  }

  res.json({
    message: "All products.",
    products,
  });
});

// יצירת מוצר על יידי מנהל
router.post("/products", authMW, adminAuthMW, async (req, res, next) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) {
      res.status(400).json({
        message: error.details[0].message,
      });
      return;
    }

    const product = new Product({ ...req.body });
    await product.save();

    res.status(201).json({
      message: "New product are created.",
      product,
    });
  } catch (error) {
    next(error);
  }
});

// קבלת מוצר לפי מזהה
router.get("/products/:id", async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      res.status(404).json({ message: "Product not found." });
      return;
    }

    if (product.quantityInStock <= 0) {
      res.json({
        message: "Out of stock",
        product,
      });
      return;
    }

    res.json({
      message: "The product.",
      product,
    });
  } catch (error) {
    next(error);
  }
});

// עריכת מוצר לפי מזהה על ידיי מנהל
router.put("/products/:id", authMW, adminAuthMW, async (req, res, next) => {
  try {
    const { error } = validateProduct(req.body);

    if (error) {
      res.status(400).json({
        message: error.details[0].message,
      });
      return;
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found." });
      return;
    }

    const updateProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { returnDocument: "after" }
    );

    res.status(200).json({
      message: "Product updated successfully.",
      updateProduct,
    });
  } catch (error) {
    next(error);
  }
});

// מחיקת כל המוצרים על יידי מנהל
router.delete("/products", authMW, adminAuthMW, async (req, res) => {
  try {
    const products = await Product.deleteMany();
    if (products.deletedCount === 0) {
      res.status(404).json({
        message: "No products found to delete.",
      });
      return;
    }

    res.json({
      message: `${products.deletedCount} product(s) deleted.`,
      deletedCount: products.deletedCount,
    });
  } catch (error) {
    next(error);
  }
});

// מחיקת מוצר לפי מזהה על יידי מנהל בלבד
router.delete("/products/:id", authMW, adminAuthMW, async (req, res, next) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id });
    if (!product) {
      res.status(404).json({
        message: "The product you want to delete does not exist.",
      });
      return;
    }

    res.json({
      message: "Product deleted.",
      product,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
