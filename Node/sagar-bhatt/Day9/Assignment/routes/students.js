const express = require("express");
const router = express.Router();

const fees = require("../data/fees.json");
const results = require("../data/results.json");
const verifyToken = require("../middlewares/verify-token");
const { authPage, authUser } = require("../middlewares/authorization");

router.get("/", verifyToken, authPage(["student"]), (req, res, next) => {
  res.json({
    message: "Welcome to students module.",
  });
});

router.get("/fees", verifyToken, authPage(["student"]), (req, res, next) => {
  res.send(fees);
});

router.get(
  "/fees/:id",
  verifyToken,
  authPage(["student"]),
  authUser,
  (req, res, next) => {
    const userId = parseInt(req.params.id);
    const userFees = fees.fees.find((elem) => elem.id === userId);
    res.send(userFees);
  }
);

router.get("/results", verifyToken, authPage(["student"]), (req, res, next) => {
  res.send(results);
});

router.get(
  "/results/:id",
  verifyToken,
  authPage(["student"]),
  authUser,
  (req, res, next) => {
    const userResult = results.results.find(
      (elem) => elem.id === parseInt(req.params.id)
    );
    res.send(userResult);
  }
);

module.exports = router;
