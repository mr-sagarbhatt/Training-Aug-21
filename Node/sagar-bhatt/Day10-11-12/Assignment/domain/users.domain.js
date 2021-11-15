const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

class UserDomain {
  // * CREATE A USER
  async createUser(req, res) {
    try {
      const data = req.body;
      const user = new UserModel(data);
      const result = await user.save();
      res.send(result);
    } catch (err) {
      res.send(err.message);
    }
  }

  // * GET ALL USERS
  getAllUsers() {
    const result = UserModel.find();
    return result;
  }
  async getUsers(req, res) {
    try {
      const result = await this.getAllUsers();
      res.send(result);
    } catch (err) {
      res.send(err.message);
    }
  }

  // * USER LOGIN
  async userLogin(req, res) {
    try {
      // * GET USER FROM BODY
      const data = req.body;
      const allUsers = await this.getAllUsers();
      // * FIND USER
      const result = await allUsers.find(
        (elem) =>
          elem.userName === data.userName && elem.password === data.password
      );
      if (result) {
        const token = jwt.sign(data, global.config.secretKey, {
          algorithm: global.config.algorithm,
          expiresIn: global.config.expiresIn,
        });
        res.status(200).json({
          message: "Login Successful.",
          token: token,
        });
      } else {
        res.status(401).json({
          message: "Login Failed!",
        });
      }
    } catch (err) {
      res.send(err.message);
    }
  }
}

module.exports = UserDomain;
