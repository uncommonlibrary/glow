const express = require("express");

const {
  logInUser, deletePost
} = require("../controllers/adminController");

const { verifyToken } = require("../middleware/tokenMiddleware");

const router = express.Router();

// log in user
router.post("/login", logInUser);

// admin deletes post
router.post("/deletepost", deletePost)

// get all users
router.get("/", (req, res) => {
    res.render("login.ejs")
});

module.exports = router;
