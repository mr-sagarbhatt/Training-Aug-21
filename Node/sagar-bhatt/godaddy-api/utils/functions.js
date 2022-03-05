const RoleModel = require("../models/roles.model");
const UserModel = require("../models/user.model");
const AuthTypeModel = require("../models/auth.type.model");
const { serverLogging } = require("../startup/logging");

// *********** GET USER FROM USER_ID ***********
async function getUser(id) {
  try {
    const user = await UserModel.findById(id);
    if (user) {
      return user;
    }
  } catch (err) {
    serverLogging.error(err);
  }
}

// *********** CREATE ROLE ***********
async function createRole({ role }) {
  try {
    const result = await RoleModel.findOne({ role });
    if (!result) {
      const useRole = new RoleModel({ role });
      const result = await useRole.save();
      console.log(result);
    }
  } catch (err) {
    serverLogging.error(err);
  }
}

// *********** CREATE AUTH TYPE ***********
async function createAuthType({ authType }) {
  try {
    const result = await AuthTypeModel.findOne({ authType });
    if (!result) {
      const auth = new AuthTypeModel({ authType });
      const result = await auth.save();
      console.log(result);
    }
  } catch (err) {
    serverLogging.error(err);
  }
}

// *********** GET USER_ROLE FROM ROLE_ID ***********
async function getRoleId(userRole) {
  try {
    const result = await RoleModel.findOne({ roleId: userRole });
    if (result) {
      return parseInt(result._id);
    }
  } catch (err) {
    serverLogging.error(err);
  }
}

// *********** GENERATE RANDOM NUMBER ***********
async function getRandomNumber() {
  try {
    return Math.floor(Math.random() * 1000000000);
  } catch (err) {
    serverLogging.error(err);
  }
}

// *********** GENERATE RANDOM PROMO CODE ***********
async function getRandomPromoCode() {
  try {
    return Math.random().toString(36).substring(2, 12).toUpperCase();
  } catch (err) {
    serverLogging.error(err);
  }
}

// *********** GENERATE ORDER NO ***********
async function getOrderNo() {
  try {
    return Math.random().toString(36).substring(2, 12).toUpperCase();
  } catch (err) {
    serverLogging.error(err);
  }
}

function capitalize(str) {
  const res = str && str[0].toUpperCase() + str.slice(1).toLowerCase();
  return res;
}

module.exports = {
  createRole,
  getRoleId,
  getRandomNumber,
  getUser,
  getRandomPromoCode,
  getOrderNo,
  capitalize,
  createAuthType,
};
