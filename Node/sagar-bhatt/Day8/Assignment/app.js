const chalk = require("chalk");
const express = require("express");
const app = express();

app.use(express.json());

require("dotenv").config();
const port = process.env.PORT;

global.config = require("./config");

// * IMPORT ROUTES
const indexRoute = require("./routes/index");
const usersRoute = require("./routes/users");

app.use("/", indexRoute);
app.use("/users", usersRoute);

app.listen(port, () => {
  console.log(chalk.blueBright(`Server started on port: ${port}`));
});
