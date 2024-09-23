const Post = require("../models/Post");
const mongoose = require("mongoose");

// GET all posts
const getAllPosts = async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  res.status(200).json(posts);
};

// GET specific post
const getPost = async (req, res) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ error: "No post found" });
  }
  res.status(200).json(post);
};

// CREATE post
const createPost = async (req, res) => {
  const user = req.user;
  const postData = req.body;

  try {
    const newPost = await Post.create({ ...postData, author: user });

    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE post
const deletePost = async (req, res) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const deletedPost = await Post.findByIdAndDelete(postId);

  if (!deletedPost) {
    return res.status(400).json({ error: "No post found" });
  }
  res.status(200).json(deletedPost);
};

// UPDATE post
const updatePost = async (req, res) => {
  const { postId } = req.params;
  const updatedPostData = req.body;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const updatedPost = await Post.findByIdAndUpdate(postId, updatedPostData, {
    new: true,
  });

  if (!updatedPost) {
    return res.status(400).json({ error: "No post found" });
  }

  res.status(200).json({ msg: "post updated!", updatedPost });
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
};
