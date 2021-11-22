const chalk = require("chalk");
const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.listen(port, () => {
  console.log(chalk.blue(`Server started on port:${port}`));
});

// * JWT CONFIGURATION
global.config = require("./authentication/global.config");

// * MONGODB CONNECTION
const { connect } = require("mongoose");
const mongoDb = process.env.DATABASE;
connectDb(mongoDb);

async function connectDb(mongoDb) {
  try {
    await connect(mongoDb);
    console.log(chalk.magenta(`MongoDb Connected!`));
  } catch (err) {
    console.log(chalk.red(err));
  }
}

// * ROUTES
const usersRoutes = require("./controllers/user/user.controller");
app.use("/users", usersRoutes);

// * CREATE ROLES
const { createRole } = require("./utils/functions");

// createRole({
//   role: "admin",
// });
// createRole({
//   role: "user",
// });
