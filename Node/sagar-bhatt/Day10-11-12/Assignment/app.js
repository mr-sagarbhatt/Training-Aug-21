const chalk = require("chalk");
require("dotenv").config({ path: "../.env" });
const port = process.env.PORT || 3000;

const express = require("express");
const app = express();
app.use(express.json());

app.listen(port, () => {
  console.log(chalk.blue(`Server started on port: ${port}`));
});

// * GLOBAL CONFIGURATION
global.config = require("./authentication/global.config");

// * MONGODB CONNECTION
const mongoose = require("mongoose");
const mongoDb = "mongodb://localhost/day10";
connectDb(mongoDb);

async function connectDb(mongoDb) {
  try {
    await mongoose.connect(mongoDb);
    console.log(chalk.magenta(`MongoDB Connected!`));
  } catch (err) {
    console.log(chalk.red(err));
  }
}

// * VERIFY TOKEN
const verifyToken = require("./authentication/verifyToken");

// * VERIFY USER
const { authPage } = require("./authentication/authorization");

// * USER ROUTER
const userRouter = require("./controller/users/user.controller");
app.use("/user", userRouter);

// * EMPLOYEE ROUTER
const employeeRouter = require("./controller/employees/employee.controller");
app.use("/emps", verifyToken, authPage(["employee", "admin"]), employeeRouter);

// * STUDENT ROUTER
const studentRouter = require("./controller/students/student.controller");
app.use(
  "/students",
  verifyToken,
  authPage(["student", "admin"]),
  studentRouter
);
