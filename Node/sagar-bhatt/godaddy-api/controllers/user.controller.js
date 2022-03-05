const UserDomain = require("../domains/users.domain");
const express = require("express");
const router = express.Router();
const verifyToken = require("../authentication/verifyToken");
const { authPage } = require("../authentication/authorization");

class UserController {
  // *********** GET LOGGED USER ***********
  static getLoggedUser(req, res, next) {
    const userDomain = new UserDomain();
    userDomain.getLoggedUser(req, res, next);
  }

  // *********** GET ALL USERS ***********
  static getAllUsers(req, res, next) {
    const userDomain = new UserDomain();
    userDomain.getAllUsers(req, res, next);
  }
  // *********** GET ACTIVE USERS ***********
  static getActiveUsers(req, res, next) {
    const userDomain = new UserDomain();
    userDomain.getActiveInactiveUsers(req, res, next, 1);
  }
  // *********** GET INACTIVE USERS :: DELETED USERS ***********
  static getInactiveUsers(req, res, next) {
    const userDomain = new UserDomain();
    userDomain.getActiveInactiveUsers(req, res, next, 0);
  }
  // *********** GET ACTIVE USERS BY ROLE :: admin ***********
  static getAllAdmins(req, res, next) {
    const userDomain = new UserDomain();
    userDomain.getUsersByRole(req, res, next, 1);
  }
  // *********** GET ACTIVE USERS BY ROLE :: customer ***********
  static getAllCustomers(req, res, next) {
    const userDomain = new UserDomain();
    userDomain.getUsersByRole(req, res, next, 2);
  }
  // *********** GET USER BY ID ***********
  static getUser(req, res, next) {
    const userDomain = new UserDomain();
    userDomain.getUser(req, res, next);
  }
  // *********** CREATE USER & PROFILE ***********
  static registerUser(req, res, next) {
    const userDomain = new UserDomain();
    userDomain.registerUser(req, res, next);
  }
  // *********** LOGIN USER ***********
  static loginUser(req, res, next) {
    const userDomain = new UserDomain();
    userDomain.loginUser(req, res, next);
  }
  // *********** DELETE USER ***********
  static deleteUser(req, res, next) {
    const userDomain = new UserDomain();
    userDomain.deleteUser(req, res, next);
  }
}

// *********** USERS ROUTES ***********
// get logged user
router.get("/", verifyToken, UserController.getLoggedUser);

router.post("/", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get(
  "/all-users/",
  verifyToken,
  authPage([1]),
  UserController.getAllUsers
);
router.get(
  "/all-users/active",
  verifyToken,
  authPage([1]),
  UserController.getActiveUsers
);
router.get(
  "/all-users/inactive",
  verifyToken,
  authPage([1]),
  UserController.getInactiveUsers
);

router.get(
  "/all-users/admin",
  verifyToken,
  authPage([1]),
  UserController.getAllAdmins
);
router.get(
  "/all-users/customer",
  verifyToken,
  authPage([1]),
  UserController.getAllCustomers
);
router.get("/:userId", verifyToken, authPage([1, 2]), UserController.getUser);
router.delete(
  "/:userId",
  verifyToken,
  authPage([1, 2]),
  UserController.deleteUser
);

module.exports = router;
