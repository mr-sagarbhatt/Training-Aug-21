const StudentDomain = require("../../../domain/students.domain");
const express = require("express");
const router = express.Router({ mergeParams: true });

class StudentController {
  // * GET Fees
  static getFees(req, res) {
    const fees = new StudentDomain();
    fees.getFees(req, res);
  }
}

router.get("/", StudentController.getFees);

module.exports = router;
