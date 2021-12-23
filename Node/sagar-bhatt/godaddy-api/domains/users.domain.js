const _ = require("lodash");
const { genSalt, hash, compare } = require("bcrypt");
const UserModel = require("../models/user.model");
const { validateUser, validateUserLogin } = require("../utils/joi.validations");
const { sign } = require("jsonwebtoken");
const ProfileModel = require("../models/profile.model");
const { getRoleId, getRandomNumber } = require("../utils/functions");

class UserDomain {
  // * GET ALL USERS
  async getAllUsers(req, res) {
    try {
      const user = await UserModel.find().populate("role", "role -_id");
      res.send(user);
    } catch (err) {
      console.log(err);
    }
  }

  // * GET USER
  async getUser(req, res) {
    try {
      const id = parseInt(req.params.userId);
      const user = await UserModel.findById(id).populate("role", "role -_id");
      if (user) {
        res.send(user);
      } else {
        res.status(400).json({
          message: "User Not Found!",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // * DELETE USER
  async deleteUser(req, res) {
    try {
      const _id = parseInt(req.params.userId);
      const user = await UserModel.findByIdAndUpdate(
        { _id },
        { $set: { isActive: 0 } },
        { new: 1 }
      ).populate("role", "role -_id");
      if (user) {
        res.send(user);
      } else {
        res.status(400).json({
          message: "User Not Found!",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // * REGISTER USER
  async registerUser(req, res) {
    try {
      let data = req.body;
      // * VALIDATE BODY DATA
      const { error } = validateUser(data);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      // * CHECK USER EMAIL
      let user = await UserModel.findOne({ email: data.email });
      if (user) {
        return res.status(400).json({
          message: "User already registered.",
        });
      }
      // * ADD DEFAULT VALUES FOR USER
      data = {
        ...data,
        role: await getRoleId("user"), // * ROLE _ID FOR USER
        customerNumber: getRandomNumber(), // * GENERATE RANDOM NUMBER
        userName: data.email,
      };

      user = new UserModel(
        _.pick(data, [
          "_id",
          "email",
          "password",
          "role",
          "customerNumber",
          "userName",
        ])
      );
      // * ENCRYPT USER PASSWORD
      const salt = await genSalt(10);
      user.password = await hash(user.password, salt);
      // * CREATE USER
      const result = await user.save();
      // * CREATE PROFILE
      const profile = new ProfileModel({ user: user._id });
      const saveProfile = await profile.save();

      if (result && saveProfile) {
        res.send(_.pick(user, ["_id", "customerNumber", "userName", "email"]));
      } else {
        res.status(400).json({
          message: "Please try again later!",
        });
      }
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      console.log(err);
    }
  }

  // * LOGIN USER
  async loginUser(req, res) {
    try {
      const data = req.body;
      // * VALIDATE BODY DATA
      const { error } = validateUserLogin(data);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      // * CHECK USER EMAIL
      let user, inputUser;
      inputUser = data.user;
      try {
        inputUser = parseInt(data.user);
        if (!inputUser) {
          inputUser = data.user;
        }
      } finally {
      }
      if (typeof inputUser === "string") {
        user = await UserModel.findOne({
          userName: inputUser,
        });
      }
      if (typeof inputUser === "number") {
        user = await UserModel.findOne({
          customerNumber: inputUser,
        });
      }
      if (!user) {
        return res.status(400).json({
          message: "Invalid customerNumber or userName.",
        });
      }
      // * COMPARE USER PASSWORD
      const validPassword = await compare(data.password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          message: "Invalid password.",
        });
      }
      // * JWT TOKEN
      const token = sign({ _id: user._id }, global.config.secretKey, {
        algorithm: global.config.algorithm,
        expiresIn: global.config.expiresIn,
      });
      res.json({
        message: "Login Successful!",
        token: token,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = UserDomain;
