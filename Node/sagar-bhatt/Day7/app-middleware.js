// * Application level middleware
const chalk = require("chalk");
require("dotenv").config({ path: "../.env" });
port = process.env.PORT || 3000;
const express = require("express");

const loggerMiddleware = (req, res, next) => {
  console.log(
    chalk.magenta(`Logged ${req.url} ${req.method} -- ${new Date()}`)
  );
  next();
};

const app = express();

app.use(loggerMiddleware);

app.get("/users", (req, res) => {
  res.json({
    status: true,
  });
});

app.post("/save", (req, res) => {
  res.json({
    status: true,
  });
});

app.use((req, res, next) => {
  res.status(404).send({
    status: 404,
    error: "Not found",
  });
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`<h3 style="color:red;">Error!!</h3>`);
});

app.listen(port, () => {
  console.log(chalk.green(`Server started on port: ${port}`));
});
