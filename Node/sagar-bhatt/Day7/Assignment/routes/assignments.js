const chalk = require("chalk");
const express = require("express");

const router = express.Router();
router.use(express.json());

// * IMPORT employees.JSON
const employees = require("../data/employees.json");

// * IMPORT JOI VALIDATIONS
const { validateAssignment } = require("../utils/validation");

// * IMPORT updateFile()
const updateFile = require("../utils/update-file");

// * Create an Assignments API
// * Get All Assignments
// ? http://localhost:3000/emps/{empID}/child/assignments
router.get("/:id/child/assignments", (req, res, next) => {
  const employee = employees.find(
    (elem) => elem.EmployeeId === parseInt(req.params.id)
  );
  if (!employee) {
    console.error(
      chalk.red(
        JSON.stringify({
          status: 404,
          message: "Employee Not Found",
        })
      )
    );
    res.status(404).send({
      status: 404,
      message: "Employee Not Found",
    });
  } else {
    res.send(employee.assignments);
  }
  next();
});

// * Get an Assignment
// ? http://localhost:3000/emps/{empID}/child/assignments/{AssignmentID}
router.get("/:id/child/assignments/:AssignmentID", (req, res, next) => {
  const employee = employees.find(
    (elem) => elem.EmployeeId === parseInt(req.params.id)
  );
  const assignment = employee.assignments.find(
    (elem) => elem.AssignmentId == parseInt(req.params.AssignmentID)
  );

  if (!employee) {
    console.error(
      chalk.red(
        JSON.stringify({
          status: 404,
          message: "Employee Not Found",
        })
      )
    );
    res.status(404).send({
      status: 404,
      message: "Employee Not Found",
    });
  } else if (!assignment) {
    console.error(
      chalk.red(
        JSON.stringify({
          status: 404,
          message: "Assignment Not Found",
        })
      )
    );
    res.status(404).send({
      status: 404,
      message: "Assignment Not Found",
    });
  } else {
    res.send(assignment);
  }
  next();
});

// * Update an assignment
// ? http://localhost:3000/emps/{empID}/child/assignments/{AssignmentID}
router.put("/:id/child/assignments/:AssignmentID", (req, res, next) => {
  const employee = employees.find(
    (elem) => elem.EmployeeId === parseInt(req.params.id)
  );
  const assignment = employee.assignments.find(
    (elem) => elem.AssignmentId == parseInt(req.params.AssignmentID)
  );

  if (!employee) {
    console.error(
      chalk.red(
        JSON.stringify({
          status: 404,
          message: "Employee Not Found",
        })
      )
    );
    res.status(404).send({
      status: 404,
      message: "Employee Not Found",
    });
  } else if (!assignment) {
    console.error(
      chalk.red(
        JSON.stringify({
          status: 404,
          message: "Assignment Not Found",
        })
      )
    );
    res.status(404).send({
      status: 404,
      message: "Assignment Not Found",
    });
  } else {
    const { error } = validateAssignment(req.body);
    if (error) {
      console.error(chalk.red(error.details[0].message));
      res.send(`<h1 style="color:red;">${error.details[0].message}</h1>`);
    } else {
      const data = req.body;
      for (let key in data) {
        assignment[key] = data[key];
      }
      updateFile("data/employees.json", employees).catch((err) => {
        console.error(err);
      });
      res.send(assignment);
    }
  }
  next();
});

// * Create an Assignments API
// ? http://localhost:3000/emps/{empID}/child/assignments

router.post("/:id/child/assignments", (req, res, next) => {
  const employee = employees.find(
    (elem) => elem.EmployeeId === parseInt(req.params.id)
  );
  if (!employee) {
    console.error(
      chalk.red(
        JSON.stringify({
          status: 404,
          message: "Employee Not Found",
        })
      )
    );
    res.status(404).send({
      status: 404,
      message: "Employee Not Found",
    });
  } else {
    const data = req.body;
    const { error } = validateAssignment(data);
    if (error) {
      console.error(chalk.red(error.details[0].message));
      res.send(`<h1 style="color:red;">${error.details[0].message}</h1>`);
    } else {
      employee.assignments.push(data);
      updateFile("data/employees.json", employees);
      res.send(data);
    }
  }
  next();
});

module.exports = router;
