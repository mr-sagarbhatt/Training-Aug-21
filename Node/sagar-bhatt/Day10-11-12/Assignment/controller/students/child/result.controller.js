const StudentDomain = require("../../../domain/students.domain");
const express = require("express");
const router = express.Router({ mergeParams: true });

class StudentController {
  // * GET RESULT
  static getResult(req, res) {
    const result = new StudentDomain();
    result.getResult(req, res);
  }
}

router.get("/", StudentController.getResult);

module.exports = router;
