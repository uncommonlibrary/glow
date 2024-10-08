const express = require("express");

const {
  createUser,
  logInUser,
  getAllUsers,
  getUserByUsername,
  getCurrentUser
} = require("../controllers/userController");

const { verifyToken } = require("../middleware/tokenMiddleware");

const router = express.Router();

// sign up/create user
router.post("/signup", createUser);

// log in user
router.post("/login", logInUser);

// get all users
router.get("/all", getAllUsers);

// testing token
router.get("/", verifyToken, getCurrentUser);

// get user by username
router.get("/:username", getUserByUsername);

module.exports = router;
