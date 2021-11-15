const DepartmentDomain = require("../domain/departments.domain");
const express = require("express");
const router = express.Router();

class DepartmentController {
  // * GET ALL DEPARTMENTS
  static async get(req, res) {
    const departmentDomain = new DepartmentDomain();
    departmentDomain.getAllDepartments(req, res);
  }
  // * GET DEPARTMENT
  static async getDepartment(req, res) {
    const departmentDomain = new DepartmentDomain();
    departmentDomain.getDepartment(req, res);
  }
  // * ADD DEPARTMENT
  static async insertDepartment(req, res) {
    const departmentDomain = new DepartmentDomain();
    departmentDomain.insertDepartment(req, res);
  }
  // * DELETE DEPARTMENT
  static async deleteDepartment(req, res) {
    const departmentDomain = new DepartmentDomain();
    departmentDomain.deleteDepartment(req, res);
  }
  // * UPDATE DEPARTMENT
  static async updateDepartment(req, res) {
    const departmentDomain = new DepartmentDomain();
    departmentDomain.updateDepartment(req, res);
  }
}

router.get("/", DepartmentController.get);
router.get("/:depId", DepartmentController.getDepartment);
router.post("/", DepartmentController.insertDepartment);
router.delete("/:depId", DepartmentController.deleteDepartment);
router.put("/:depId", DepartmentController.updateDepartment);

module.exports = router;
