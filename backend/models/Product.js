const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    variation: { type: String },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    productPhoto: { type: String },
    productLink: { type: String, required: true },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: { type: String, enum: ["pending", "approved", "rejected"] },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
