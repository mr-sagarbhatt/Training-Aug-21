const chalk = require("chalk");
const express = require("express");

const router = express.Router();
router.use(express.json());

// * IMPORT employees.JSON
const employees = require("../data/employees.json");

// * IMPORT JOI VALIDATIONS
const { validateEmployee, validateAssignment } = require("../utils/validation");

// * IMPORT updateFile()
const updateFile = require("../utils/update-file");

// * GET ALL EMPLOYEES
router.get("/", (req, res, next) => {
  res.send(employees);
  next();
});

// * GET AN EMPLOYEE
router.get("/:id", (req, res, next) => {
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
    res.send(employee);
  }
  next();
});

// * Update AN EMPLOYEE
router.put("/:id", (req, res, next) => {
  let employee = employees.find(
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
    const { error } = validateEmployee(req.body);
    if (error) {
      console.error(chalk.red(error.details[0].message));
      res.send(`<h1 style="color:red;">${error.details[0].message}</h1>`);
    } else {
      const data = req.body;
      for (let key in data) {
        if (!Array.isArray(data[key])) {
          employee[key] = data[key];
        } else {
          if (typeof data[key][0] === "object") {
            for (let subKey in data[key][0]) {
              employee[key][0][subKey] = data[key][0][subKey];
            }
          } else {
            for (let subKey in data[key]) {
              employee[key][subKey] = data[key][subKey];
            }
          }
        }
      }
      updateFile("data/employees.json", employees).catch((err) => {
        console.error(err);
      });
      res.send(employee);
    }
  }
  next();
});

// * CREATE AN EMPLOYEE
router.post("/", (req, res, next) => {
  const data = req.body;
  const { error } = validateEmployee(data);
  if (error) {
    console.error(chalk.red(error.details[0].message));
    res.send(`<h1 style="color:red;">${error.details[0].message}</h1>`);
  } else {
    data.EmployeeId = employees.length + 1;
    employees.push(data);
    updateFile("data/employees.json", employees);
    res.send(data);
  }
  next();
});

// * DELETE AN EMPLOYEE
router.delete("/employees/:id", (req, res, next) => {
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
    const index = employees.indexOf(employee);
    employees.splice(index, 1);
    updateFile("data/employees.json", employees);
    res.send(employee);
  }
  next();
});

// * Error Handling Middleware
// router.use((req, res, next) => {
//   next(err);
// });

// router.use((err, req, res, next) => {
//   console.error(
//     chalk.red(
//       JSON.stringify({
//         status: 404,
//         message: "Page Not Found",
//       })
//     )
//   );
//   res.status(404).send({
//     status: 404,
//     message: "Page Not Found",
//   });
// });
module.exports = router;
