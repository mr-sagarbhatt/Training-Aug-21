const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to users api.",
    link: "http://localhost:3000/users",
  });
});

module.exports = router;
