const EmployeeDomain = require("../../../domain/employees.domain");
const express = require("express");
const router = express.Router({ mergeParams: true });

class AssignmentController {
  // * GET ALL ASSIGNMENTS
  static getAllAssignments(req, res) {
    const assignments = new EmployeeDomain();
    assignments.getAllAssignments(req, res);
  }

  // * GET AN ASSIGNMENT
  static getAssignment(req, res) {
    const assignment = new EmployeeDomain();
    assignment.getAssignment(req, res);
  }

  // * CREATE AN ASSIGNMENT
  static createAssignment(req, res) {
    const assignment = new EmployeeDomain();
    assignment.createAssignment(req, res);
  }

  // * DELETE AN ASSIGNMENT
  static deleteAssignment(req, res) {
    const assignment = new EmployeeDomain();
    assignment.deleteAssignment(req, res);
  }

  // * UPDATE AN ASSIGNMENT
  static updateAssignment(req, res) {
    const assignment = new EmployeeDomain();
    assignment.updateAssignment(req, res);
  }
}

router.get("/", AssignmentController.getAllAssignments);
router.get("/:assignmentId", AssignmentController.getAssignment);
router.post("/create", AssignmentController.createAssignment);
router.delete("/:assignmentId", AssignmentController.deleteAssignment);
router.put("/:assignmentId", AssignmentController.updateAssignment);

module.exports = router;
