const chalk = require("chalk");
require("dotenv").config();
const express = require("express");
global.config = require("./config");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const indexRoute = require("./routes/index");
const usersRoute = require("./routes/users");
const employeesRoute = require("./routes/employees");
const studentsRoute = require("./routes/students");

app.use("/", indexRoute);
app.use("/users", usersRoute);
app.use("/employees", employeesRoute);
app.use("/students", studentsRoute);

app.listen(port, () => {
  console.log(chalk.blue(`Server started on port: ${port}`));
});
