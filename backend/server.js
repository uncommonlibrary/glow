require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/products", productRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
app.use("/admin", adminRoutes);

// connect to db
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// listen for request
app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
});

module.exports = app;
