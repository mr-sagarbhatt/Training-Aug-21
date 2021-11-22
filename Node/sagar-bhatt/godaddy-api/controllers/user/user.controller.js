const UserDomain = require("../../domains/users.domain");
const express = require("express");
const router = express.Router();
const verifyToken = require("../../authentication/verifyToken");
const { authPage } = require("../../authentication/authorization");

class UserController {
  // * GET ALL USERS
  static getAllUsers(req, res) {
    const userDomain = new UserDomain();
    userDomain.getAllUsers(req, res);
  }
  // * GET USER
  static getUser(req, res) {
    const userDomain = new UserDomain();
    userDomain.getUser(req, res);
  }
  // * CREATE USER & PROFILE
  static registerUser(req, res) {
    const userDomain = new UserDomain();
    userDomain.registerUser(req, res);
  }
  // * LOGIN USER
  static loginUser(req, res) {
    const userDomain = new UserDomain();
    userDomain.loginUser(req, res);
  }
}

// * USERS ROUTES
router.post("/", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/", verifyToken, authPage([1]), UserController.getAllUsers);
router.get("/:userId", verifyToken, authPage([1]), UserController.getUser);

module.exports = router;
