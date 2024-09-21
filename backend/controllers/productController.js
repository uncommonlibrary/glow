const Product = require("../models/Product");
const mongoose = require("mongoose");

// GET all products
const getAllProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  res.status(200).json(products);
};

// GET specific product
const getProduct = async (req, res) => {
  const { productId } = req.params; 

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ error: "No product found" });
  }
  res.status(200).json(product);
};

// POST new product
const createProduct = async (req, res) => {
  const productData = req.body;
  // creates a new doc in the mongoDB
  try {
    const product = await Product.create({ ...productData });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE specific product
const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const deletedProduct = await Product.findByIdAndDelete(productId);

  if (!deletedProduct) {
    return res.status(400).json({ error: "No product found" });
  }
  res.status(200).json(deletedProduct);
};

// UPDATE specific product
const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const updatedProductData = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updatedProductData,
    { new: true }
  );

  if (!updatedProduct) {
    return res.status(400).json({ error: "No product found" });
  }

  res.status(200).json({ msg: "product updated!", updatedProduct });
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};