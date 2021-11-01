require("dotenv").config({ path: "../.env" });
const http = require("http");
const { readFile } = require("fs");
const chalk = require("chalk");
const port = process.env.PORT || 3001;
const jsdom = require("jsdom");
const dom = new jsdom.JSDOM(
  `<!DOCTYPE html>
  <html>
  <head id=head></head>
  <body></body>
  </html>`
);
const $ = require("jquery")(dom.window);
$(".head").append("<link />").prop({
  rel: "stylesheet",
  href: "../../../node_modules/bootstrap/dist/css/bootstrap.min.css",
});
$("body").append(
  $("<button></button>").prop({ class: "btn btn-dark" }).text("Start Test")
);
const body = $("body").html();

const server = http.createServer((req, res) => {
  readFile("./timer.html", (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("File not found!");
    } else {
      res.end(body);
    }
  });
});

server.listen(port, () =>
  console.log(chalk.green(`Server started on port: ${port}`))
);
