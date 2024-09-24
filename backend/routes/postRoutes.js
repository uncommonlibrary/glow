const express = require("express");
const {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/postController");

const { verifyToken } = require("../middleware/tokenMiddleware");

const router = express.Router();

// GET all posts
router.get("/", verifyToken, getAllPosts);

// GET specific product
router.get("/:postId", getPost);

// POST new product
router.post("/", verifyToken, createPost);

// DELETE specific product
router.delete("/:postId", deletePost);

// UPDATE specific product
router.patch("/:postId", updatePost);

module.exports = router;