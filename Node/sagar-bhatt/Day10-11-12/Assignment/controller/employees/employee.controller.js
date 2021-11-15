const EmployeeDomain = require("../../domain/employees.domain");
const express = require("express");
const router = express.Router();

class EmployeeController {
  // * GET ALL EMPLOYEES
  static getAllEmployees(req, res) {
    const employee = new EmployeeDomain();
    employee.getAllEmployees(req, res);
  }

  // * GET AN EMPLOYEE
  static getAnEmployee(req, res) {
    const employee = new EmployeeDomain();
    employee.getAnEmployee(req, res);
  }

  // * CREATE AN EMPLOYEE
  static createAnEmployee(req, res) {
    const employee = new EmployeeDomain();
    employee.createAnEmployee(req, res);
  }

  // * DELETE AN EMPLOYEE
  static deleteAnEmployee(req, res) {
    const employee = new EmployeeDomain();
    employee.deleteAnEmployee(req, res);
  }

  // * UPDATE AN EMPLOYEE
  static updateAnEmployee(req, res) {
    const employee = new EmployeeDomain();
    employee.updateAnEmployee(req, res);
  }
}

// * ASSIGNMENT ROUTER
const assignmentsRouter = require("./child/assignment.controller");
router.use("/:id/child/assignments", assignmentsRouter);

router.get("/", EmployeeController.getAllEmployees);
router.get("/:id", EmployeeController.getAnEmployee);
router.post("/create", EmployeeController.createAnEmployee);
router.delete("/:id", EmployeeController.deleteAnEmployee);
router.put("/:id", EmployeeController.updateAnEmployee);

module.exports = router;
