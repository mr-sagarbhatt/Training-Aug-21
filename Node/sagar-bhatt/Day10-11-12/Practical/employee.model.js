const chalk = require("chalk");
const mongoose = require("mongoose");

// * Connecting to MongoDB server and database
const mongoDB = "mongodb://localhost:27017/employeeDb";
mongoose
  .connect(mongoDB)
  .then(() => console.log(chalk.magenta(`mongodb connected!`)))
  .catch((err) => console.log(chalk.reset(err)));

// * Schema
const employeeSchema = new mongoose.Schema({
  ID: Number,
  Name: String,
  Address: {
    AddressLine1: String,
    AddressLine2: String,
    AddressLine3: String,
  },
  skills: [],
});

// * Model
const EmployeeCollection = mongoose.model("EmployeeCollection", employeeSchema);

// * Create Employee
const createEmployee = async () => {
  try {
    const empObj1 = new EmployeeCollection({
      ID: 1,
      Name: "sagar",
      Address: {
        AddressLine1: "123",
        AddressLine2: "123",
        AddressLine3: "123",
      },

      skills: [1, 2, 3],
    });
    const empObj2 = new EmployeeCollection({
      ID: 2,
      Name: "sagar",
      Address: {
        AddressLine1: "123",
        AddressLine2: "123",
        AddressLine3: "123",
      },
      skills: [1, 2, 3],
    });

    const result = await EmployeeCollection.insertMany([empObj1, empObj2]);
    console.log(chalk.blue(result));
  } catch (err) {
    console.log(chalk.red(err));
  }
};

// createEmployee();

// * Read Users
const readEmployee = async () => {
  const result = await EmployeeCollection.find();
  console.log(chalk.blue(result));
};
readEmployee().catch((err) => console.log(chalk.red(err)));
