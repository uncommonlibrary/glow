const User = require("../models/User");
const Post = require("../models/Post");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_LENGTH = 12;

const createJWT = (user) => {
  const payload = {
    name: user.name,
    username: user.username,
    email: user.email,
    _id: user._id,
  };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "3h" };
  return jwt.sign(payload, secret, options);
};

//log in user
const logInUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("req body in login user:", req.body);
  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compare(password, user.passwordHash)) {
      if (user.isModerator) {
        const token = createJWT(user);
        //   res.status(200).json({ user, token });
        const posts = await Post.find({})
          .populate("author")
          .sort({ createdAt: -1 });
        res.render("posts.ejs", { token, user, posts }); //can pass antyhiing
      } else {
        res
          .status(403)
          .json({ error: "Only moderators are allowed to log in" });
      }
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete selected post
const deletePost = async (req, res) => {
  try {
    const postId = req.body._id;
    await Post.findByIdAndDelete(postId);
    res.render("success.ejs");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting post");
  }
};

module.exports = { logInUser, deletePost };
