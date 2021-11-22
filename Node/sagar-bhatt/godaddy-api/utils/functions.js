const RoleModel = require("../models/roles.model");
const UserModel = require("../models/user.model");

// * GET USER
async function getUser(id) {
  try {
    const user = await UserModel.findById(id);
    if (user) {
      return user;
    }
  } catch (err) {
    console.log(err);
  }
}

// * GET LATEST USER ID
// async function getLatestUserId(model) {
//   try {
//     const id = await model.findOne().sort({ _id: -1 }).limit(1);
//     if (!id) {
//       return 0;
//     }
//     return id._id;
//   } catch (err) {
//     console.log(err);
//   }
// }

// * CREATE ROLE
async function createRole(data) {
  try {
    const role = new RoleModel(data);
    const result = await role.save();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

// * GET USER ROLE
async function getRoleId(userRole) {
  try {
    const result = await RoleModel.findOne({ role: userRole });
    if (result) {
      return parseInt(result._id);
    }
  } catch (err) {
    console.log(err.message);
  }
}

// * GENERATE RANDOM NUMBER
function getRandomNumber() {
  try {
    return Math.floor(Math.random() * 1000000000);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createRole,
  getRoleId,
  getRandomNumber,
  getUser,
};
