const UserDomain = require("../../domain/users.domain");
const express = require("express");
const router = express.Router();

class UserController {
  // * CREATE A USER
  static createUser(req, res) {
    const user = new UserDomain();
    user.createUser(req, res);
  }

  // * USER LOGIN
  static userLogin(req, res) {
    const user = new UserDomain();
    user.userLogin(req, res);
  }

  // * GET ALL USERS
  static getUsers(req, res) {
    const user = new UserDomain();
    user.getUsers(req, res);
  }
}

router.post("/create", UserController.createUser);
router.post("/login", UserController.userLogin);
router.get("/", UserController.getUsers);

module.exports = router;
