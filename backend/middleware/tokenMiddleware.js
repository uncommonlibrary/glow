const User = require("../models/User");
const jwt = require("jsonwebtoken");

const setUser = (req, user) => {
  req.user = user;
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token not found" });
    }
    console.log("Extract token", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token", decoded);

    const user = await User.findById(decoded._id);
    if (user) {
      setUser(req, user);
      return next();
    }
    return res.status(401).json({ error: "User not found" });
  } catch (error) {
    console.error("Backend token verification error", error);
    res.status(401).json({ error: "Invalid authorisation token" });
  }
};

module.exports = { verifyToken };