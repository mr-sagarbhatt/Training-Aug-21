const StudentDomain = require("../../domain/students.domain");
const express = require("express");
const router = express.Router();

class StudentController {
  // * GET ALL STUDENTS
  static getAllStudents(req, res) {
    const student = new StudentDomain();
    student.getAllStudents(req, res);
  }

  // * GET STUDENT
  static getStudent(req, res) {
    const student = new StudentDomain();
    student.getStudent(req, res);
  }

  // * CREATE STUDENT
  static createStudent(req, res) {
    const student = new StudentDomain();
    student.createStudent(req, res);
  }

  // * DELETE STUDENT
  static deleteStudent(req, res) {
    const student = new StudentDomain();
    student.deleteStudent(req, res);
  }

  // * UPDATE STUDENT
  static updateStudent(req, res) {
    const student = new StudentDomain();
    student.updateStudent(req, res);
  }
}

// * FEES ROUTER
const feesRouter = require("./child/fees.controller");
router.use("/:id/child/fees", feesRouter);

// * RESULT ROUTER
const resultRouter = require("./child/result.controller");
router.use("/:id/child/result", resultRouter);

router.get("/", StudentController.getAllStudents);
router.get("/:id", StudentController.getStudent);
router.post("/create", StudentController.createStudent);
router.delete("/:id", StudentController.deleteStudent);
router.put("/:id", StudentController.updateStudent);

module.exports = router;
