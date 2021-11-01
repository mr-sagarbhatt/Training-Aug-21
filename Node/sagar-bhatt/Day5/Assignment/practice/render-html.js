require("dotenv").config({ path: "../.env" });
const http = require("http");
const { readFile } = require("fs");
const chalk = require("chalk");
const port = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  readFile("./timer.html", (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("File not found!");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});
server.listen(port, () =>
  console.log(chalk.green(`Server started on port: ${port}`))
);
