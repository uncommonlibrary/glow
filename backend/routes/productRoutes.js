const express = require("express");
const {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getSearchProducts,
} = require("../controllers/productController");

const router = express.Router();

// GET all products
router.get("/", getAllProducts);

// GET search products
router.get("/query", getSearchProducts)

// GET specific product
router.get("/:productId", getProduct);

// POST new product
router.post("/", createProduct);

// DELETE specific product
router.delete("/:productId", deleteProduct);

// UPDATE specific product
router.patch("/:productId", updateProduct);

module.exports = router;
