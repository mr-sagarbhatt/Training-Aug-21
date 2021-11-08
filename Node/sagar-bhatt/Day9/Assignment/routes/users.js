const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to users module.",
  });
});

router.post("/login", (req, res, next) => {
  const userData = {
    userName: req.body.userName,
    password: req.body.password,
    role: req.body.role,
  };
  if (userData.userName === "sagar" && userData.password === "sagar112") {
    const token = jwt.sign(userData, global.config.secretKey, {
      algorithm: global.config.algorithm,
      expiresIn: global.config.expiresIn,
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

module.exports = router;
