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

// GET specific post
router.get("/:postId", getPost);

// POST new post
router.post("/", verifyToken, createPost);

// DELETE specific post
router.delete("/:postId", verifyToken, deletePost);

// UPDATE specific post
router.patch("/:postId", verifyToken, updatePost);

module.exports = router;