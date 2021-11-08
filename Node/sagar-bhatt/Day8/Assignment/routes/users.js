const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const fees = require("../data/fees.json").fees;
const results = require("../data/results.json").results;

const verifyToken = require("../middlewares/verifyToken");

router.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to users module.",
  });
});

router.post("/login", (req, res, next) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
  };
  if (userData.username === "admin" && userData.password === "admin") {
    const token = jwt.sign(userData, global.config.secretKey, {
      algorithm: global.config.algorithm,
      // expiresIn: global.config.expiresIn,
    });
    res.status(200).json({
      message: "Login Successful.",
      token: token,
    });
  } else {
    res.status(401).json({
      message: "Login Failed.",
    });
  }
});

router.get("/fees", verifyToken, (req, res, next) => {
  res.json(fees);
});

router.get("/results", verifyToken, (req, res, next) => {
  res.json(results);
});

module.exports = router;
