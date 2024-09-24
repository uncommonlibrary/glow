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

//sign up user
const createUser = async (req, res) => {
  const userData = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ username: userData.username }, { email: userData.email }],
    });
    if (existingUser) {
      return res.status(400).json({ error: "This account already exists!" });
    }

    // create user if it doesn't exist
    const hashedPassword = await bcrypt.hash(userData.passwordHash, SALT_LENGTH);
    const newUser = await User.create(userData);
    newUser.passwordHash = hashedPassword
    await newUser.save();
    const token = createJWT(newUser);
    res
      .status(201)
      .json({ message: "User created successfully!", user: newUser, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//log in user
const logInUser = async (req, res) => {
  const { username, passwordHash } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && bcrypt.compare(passwordHash, user.passwordHash)) {
      const token = createJWT(user);
      res.status(200).json({ user, token });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get one user
const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ error: "Missing username" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ msg: "User found", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { createUser, logInUser, getAllUsers, getUserByUsername };
