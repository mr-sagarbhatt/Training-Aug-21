const RolesDomain = require("../domains/roles.domain");
const express = require("express");
const router = express.Router();

class RolesController {
  // *********** GET ALL USER ROLES ***********
  static getAllRoles(req, res) {
    const rolesDomain = new RolesDomain();
    rolesDomain.getAllRoles(req, res);
  }
  // *********** CREATE USER ROLE ***********
  static createRole(req, res) {
    const rolesDomain = new RolesDomain();
    rolesDomain.createRole(req, res);
  }
  // *********** UPDATE USER ROLE ***********
  static updateRole(req, res) {
    const rolesDomain = new RolesDomain();
    rolesDomain.updateRole(req, res);
  }
  // *********** DELETE USER ROLE ***********
  static deleteRole(req, res) {
    const rolesDomain = new RolesDomain();
    rolesDomain.deleteRole(req, res);
  }
}

// *********** USER ROLE ROUTES ***********
router.get("/", RolesController.getAllRoles);
router.post("/", RolesController.createRole);
router.put("/:roleId", RolesController.updateRole);
router.delete("/:roleId", RolesController.deleteRole);

module.exports = router;
