const chalk = require("chalk");
require("dotenv").config({ path: "../.env" });
const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(chalk.green(`Server started on port: ${port}`));
});

// * LOGGER MIDDLEWARE
const logger = require("./middlewares/logger");
app.use(logger);

// * ALL ROUTES
// * HOME PAGE
app.get("/", (req, res) => {
  res.send(
    `<h3>Employees API</h3>
    <a href="http://localhost:3000/employees">http://localhost:3000/employees</a>`
  );
});

const employeeRoutes = require("./routes/employees");
app.use("/employees", employeeRoutes);

const assignmentsRoutes = require("./routes/assignments");
app.use("/emps", assignmentsRoutes);
