const express = require("express");
const router = express.Router();

const assignments = require("../data/assignments.json");
const verifyToken = require("../middlewares/verify-token");
const { authPage } = require("../middlewares/authorization");

router.get("/", verifyToken, authPage(["employee"]), (req, res, next) => {
  res.json({
    message: "Welcome to employees module.",
  });
});

router.get(
  "/assignments",
  verifyToken,
  authPage(["employee"]),
  (req, res, next) => {
    res.json(assignments);
  }
);

router.get(
  "/assignments/:id",
  verifyToken,
  authPage(["employee"]),
  (req, res, next) => {
    res.json(assignment);
  }
);

module.exports = router;
