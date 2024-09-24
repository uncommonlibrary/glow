const User = require("../models/User");
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
      const token = createJWT(user);
    //   res.status(200).json({ user, token });
    res.render("posts.ejs", {token, user}) //can pass antyhiing
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { logInUser };