const express = require("express");
const {
  createUser,
  logInUser,
  getAllUsers,
  getUserByUsername,
} = require("../controllers/userController");

const router = express.Router();

// sign up/create user
router.post("/signup", createUser);

// log in user
router.post("/login", logInUser);

// get all users
router.get("/all", getAllUsers);

// get user by username
router.get("/:username", getUserByUsername);

module.exports = router;
