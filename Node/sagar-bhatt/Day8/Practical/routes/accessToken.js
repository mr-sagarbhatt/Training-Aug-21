const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log(token);
});

module.exports = router;
