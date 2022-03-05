const RolesModel = require("../models/roles.model");
const { validateRole } = require("../utils/joi.validations");

class RolesDomain {
  // *********** GET ALL ACTIVE USER ROLES ***********
  async getAllRoles(req, res, next) {
    try {
      const role = await RolesModel.find({ isActive: 1 });
      if (role.length > 0) {
        res.send(role);
      } else {
        res.json({
          message: `No results found!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** CREATE USER ROLE ***********
  async createRole(req, res, next) {
    try {
      const data = req.body;
      // * VALIDATE BODY DATA *
      const { error } = validateRole(data);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      // * SAVE USER ROLE *
      const role = new RolesModel(data);
      const saveRole = await role.save();
      if (saveRole) {
        res.send(saveRole);
      } else {
        res.status(400).json({
          message: "Please try again later!",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** UPDATE USER ROLE ***********
  async updateRole(req, res, next) {
    try {
      const _id = parseInt(req.params.roleId);
      const data = req.body;
      // * VALIDATE BODY DATA *
      const { error } = validateRole(data);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      // * UPDATE USER ROLE *
      const role = await RolesModel.findOneAndUpdate(
        { _id, isActive: 1 },
        { $set: data },
        { new: 1, runValidators: true }
      );
      if (role) {
        res.send(role);
      } else {
        res.status(400).json({
          message: "User role Not Found!",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** DELETE USER ROLE ***********
  async deleteRole(req, res, next) {
    try {
      const _id = parseInt(req.params.roleId);
      const role = await RolesModel.findByIdAndUpdate(
        { _id },
        { $set: { isActive: 0 } },
        { new: 1 }
      );
      if (role) {
        res.send(role);
      } else {
        res.status(400).json({
          message: "User role Not Found!",
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RolesDomain;
