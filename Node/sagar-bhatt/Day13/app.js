const chalk = require("chalk");
require("dotenv").config();
const port = process.env.PORT || 3000;

const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(chalk.blue(`Server started on port: ${port}`));
});

// * MONGODB CONNECTION
const { connect } = require("mongoose");
const mongoDb = "mongodb://localhost/day13";
connectDb(mongoDb);

async function connectDb(mongoDb) {
  try {
    await connect(mongoDb);
    console.log(chalk.magenta(`MongoDB Connected!`));
  } catch (err) {
    console.log(chalk.red(err));
  }
}

// * DEPARTMENTS ROUTES
const departmentsRoutes = require("./controller/department.controller");
app.use("/departments", departmentsRoutes);

// * MEDICINES ROUTES
const medicinesRoutes = require("./controller/medicine.controller");
app.use("/medicines", medicinesRoutes);

// * DOCTORS ROUTES
const doctorsRoutes = require("./controller/doctor.controller");
app.use("/doctors", doctorsRoutes);

// * PATIENTS ROUTES
const patientsRoutes = require("./controller/patient.controller");
app.use("/patients", patientsRoutes);

// * ASSISTANTS ROUTES
const assistantsRoutes = require("./controller/assistant.controller");
app.use("/assistants", assistantsRoutes);
