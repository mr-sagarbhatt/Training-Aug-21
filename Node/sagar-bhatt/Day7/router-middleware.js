// * Router Level Middleware
const chalk = require("chalk");
require("dotenv").config({ path: "../.env" });
port = process.env.PORT || 3000;
const express = require("express");

const app = express();
const router = express.Router();

router.use((req, res, next) => {
  console.log(chalk.magenta(new Date()));
  next();
});

// router.get("/users", (req, res) => {
//   res.json({
//     status: true,
//   });
// });
router.get(
  "/user/:id",
  (req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  (req, res, next) => {
    console.log("Request Type:", req.method);
    next();
  },
  (req, res) => {
    res.json({
      status: true,
      id: req.params.id,
    });
  }
);

app.use("/", router);

router.use((req, res, next) => {
  res.status(404).send({
    status: 404,
    error: "Not found",
  });
  next(err);
});

app.use(function (err, req, res, next) {
  //   console.error(err.stack);
  //   res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(chalk.green(`Server started on port: ${port}`));
});
