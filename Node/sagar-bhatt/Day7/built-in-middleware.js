// * Built in middleware
const chalk = require("chalk");
require("dotenv").config({ path: "../.env" });
port = process.env.PORT || 3000;

const express = require("express");
app = express();

// * express.static(root, [options])
// ? To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use(express.static("assets"));
app.get("/", (req, res) => {
  res.send(`<a href="img/image1.jpg"> image1</a>`);
});

// * express.json([options])
// ? Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option(default is type: "application/json").
app.use(
  express.json({
    type: "application/json", // default for express.json()
  })
);
app.post("/save", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// * express.Router([options])
// ? Creates a new router object.
// * var router = express.Router([options])

const router = express.Router({
  caseSensitive: true, // Disabled by default, treating “/Foo” and “/foo” as the same.
});

app.get("/app", (req, res) => {
  res.send("Application");
});

router.get("/router", (req, res) => {
  res.send("Router - Case sensitive");
});
app.use(router);

// * For all routes
app.use((req, res, next) => {
  next(err);
});

// * Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).send("Error");
});

app.listen(port, () => {
  console.log(chalk.green(`Server started on port: ${port}`));
});
