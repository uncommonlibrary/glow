const express = require("express");

const {
  logInUser,
} = require("../controllers/adminController");

const { verifyToken } = require("../middleware/tokenMiddleware");

const router = express.Router();

// log in user
router.post("/login", logInUser);

router.post("/deletepost", (req, res) => {
    //code
    res.render("success.ejs")
})

// get all users
// router.get("/all", getAllUsers);

// get all users
router.get("/", (req, res) => {
    res.render("login.ejs")
});

module.exports = router;
