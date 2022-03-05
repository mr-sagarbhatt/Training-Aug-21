const _ = require("lodash");
const { genSalt, hash, compare } = require("bcrypt");
const UserModel = require("../models/user.model");
const { validateUser, validateUserLogin } = require("../utils/joi.validations");
const { sign } = require("jsonwebtoken");
const ProfileModel = require("../models/profile.model");
const { getRandomNumber } = require("../utils/functions");

class UserDomain {
  // *********** GET LOGGED USER ***********
  async getLoggedUser(req, res, next) {
    try {
      console.log(req.decoded);
      const _id = parseInt(req.decoded._id);
      const user = await UserModel.findById({ _id }).populate(
        "roleId",
        "role -_id"
      );
      const profile = await ProfileModel.findOne({ userId: _id });
      let userData = JSON.parse(JSON.stringify(user));
      userData.profile = profile;
      if (userData) {
        res.send(userData);
      } else {
        res.status(400).json({
          message: "User logged out!",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** GET ALL ACTIVE USERS ***********
  async getAllUsers(req, res, next) {
    try {
      const user = await UserModel.find({ isActive: 1 }).populate(
        "roleId",
        "role -_id"
      );
      if (user.length > 0) {
        res.send(user);
      } else {
        res.json({
          message: `No results found!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** GET ALL USERS :: ACTIVE OR INACTIVE ***********
  async getActiveInactiveUsers(req, res, next, isActive) {
    try {
      const user = await UserModel.find({ isActive }).populate(
        "roleId",
        "role -_id"
      );
      if (user.length > 0) {
        res.send(user);
      } else {
        res.json({
          message: `No results found!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** GET ALL ACTIVE USERS BY ROLE ***********
  async getUsersByRole(req, res, next, roleId) {
    try {
      const user = await UserModel.find({
        isActive: 1,
        roleId,
      }).populate("roleId", "role -_id");
      if (user.length > 0) {
        res.send(user);
      } else {
        res.json({
          message: `No results found!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** GET USER BY ID ***********
  async getUser(req, res, next) {
    try {
      const _id = parseInt(req.params.userId);
      const user = await UserModel.findById({ _id }).populate(
        "roleId",
        "role -_id"
      );
      if (user) {
        res.send(user);
      } else {
        res.status(400).json({
          message: "User Not Found!",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** DELETE USER ***********
  async deleteUser(req, res, next) {
    try {
      const _id = parseInt(req.params.userId);
      const user = await UserModel.findByIdAndUpdate(
        { _id },
        { $set: { isActive: 0 } },
        { new: 1 }
      ).populate("roleId", "role -_id");
      const profile = await ProfileModel.findOneAndUpdate(
        { userId: _id },
        { $set: { isActive: 0 } },
        { new: 1 }
      );
      if (user && profile) {
        res.send(user);
      } else {
        res.status(400).json({
          message: "User Not Found!",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** REGISTER USER ***********
  async registerUser(req, res, next) {
    try {
      let data = req.body;
      // * VALIDATE BODY DATA
      const { error } = validateUser(data);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      // * CHECK USER NAME AND EMAIL EXISTS *
      let chkUserEmail = await UserModel.findOne({ email: data.email });
      if (chkUserEmail) {
        return res.status(400).json({
          message: "Email is already exists.",
        });
      }
      // * ADD DEFAULT VALUES FOR USER *
      let userName = "";
      if (data.userName) {
        let chkUserName = await UserModel.findOne({
          userName: data?.userName,
        });
        if (chkUserName) {
          return res.status(400).json({
            message: "Username is already exists.",
          });
        }
        userName = data.userName;
      } else {
        userName = data.email;
      }
      data = {
        ...data,
        roleId: 2, // * ROLE _ID FOR CUSTOMER
        customerNumber: await getRandomNumber(), // * GENERATE RANDOM NUMBER
        userName,
      };
      console.log(data);

      let user = new UserModel(
        _.pick(data, [
          "_id",
          "email",
          "password",
          "roleId",
          "customerNumber",
          "userName",
          "firebaseUId",
          "authTypeId",
        ])
      );
      // * ENCRYPT USER PASSWORD *
      const salt = await genSalt(10);
      if (user.password) {
        user.password = await hash(user.password, salt);
      }
      // * SAVE USER *
      const saveUser = await user.save();

      if (saveUser) {
        // * SAVE PROFILE *
        // const profile = new ProfileModel({ userId: saveUser._id });
        // const saveProfile = await profile.save();
        res.send(_.pick(user, ["_id", "customerNumber", "userName", "email"]));
      } else {
        res.status(400).json({
          message: "Please try again later!",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** LOGIN USER ***********
  async loginUser(req, res, next) {
    try {
      const data = req.body;
      // * VALIDATE BODY DATA *
      const { error } = validateUserLogin(data);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      if (data.authTypeId === 3) {
        // * CHECK USER_NAME OR CUSTOMER_NUMBER *
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
            isActive: 1,
          });
        }
        if (typeof inputUser === "number") {
          user = await UserModel.findOne({
            customerNumber: inputUser,
            isActive: 1,
          });
        }
        if (!user) {
          return res.status(400).json({
            message: "You entered an incorrect username or password.",
          });
        }
        // * COMPARE USER PASSWORD *
        const validPassword = await compare(data.password, user.password);
        if (!validPassword) {
          return res.status(400).json({
            message: "You entered an incorrect username or password.",
          });
        }
        // * JWT TOKEN *
        const token = sign({ _id: user._id }, global.config.secretKey, {
          algorithm: global.config.algorithm,
          expiresIn: global.config.expiresIn,
        });
        res.json({
          message: "Login Successful!",
          token: token,
        });
      } else {
        let user = await UserModel.findOne({
          authTypeId: data.authTypeId,
          email: data.user,
          firebaseUId: data.firebaseUId,
          isActive: 1,
        });
        if (!user) {
          return res.status(400).json({
            message: "User Not Found! Please create your account.",
          });
        }
        // * JWT TOKEN *
        const token = sign({ _id: user._id }, global.config.secretKey, {
          algorithm: global.config.algorithm,
          expiresIn: global.config.expiresIn,
        });
        res.json({
          message: "Login Successful!",
          token: token,
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserDomain;
