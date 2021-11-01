// * http
const http = require("http");
// * url
const url = require("url");
// * path
const path = require("path");
// * util
const util = require("util");

require("dotenv").config({ path: "../.env" });
const port = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  console.log(req.url);
  const objUrl = url.parse(req.url, true);
  res.end(`<h3>Hello, World! <br \>
  =====url===== <br />
  ${req.url} <br \>
  ${JSON.stringify(objUrl)} <br />
  =====path===== <br />
  ${path.delimiter} ${path.sep} <br />
  ${path.dirname("./Assignment/data/person.json")} <br />
  ${path.basename("./Assignment/data/person")} <br />
  ${path.basename("./Assignment/data/person.json")} <br />
  ${path.basename("./Assignment/data/person.json", ".json")} <br />
  ${path.extname("./Assignment/data/person.json")} <br />
  ${path.format({ dir: "./Assignment/data", base: "person.json" })} <br />
  </h3>`);
});
server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

console.log(path.parse("./Assignment/data/person.json"));
console.log(path.join("/", "users", "name", "notes.txt"));

const str = "Learning %s";
const result = util.format(str, "NodeJS Util Module.");

console.log(result);

// --------------------------------------------------------------------------------------

// * http
// TODO: https://www.geeksforgeeks.org/node-js-http-module/
// ?  To use the HTTP server in node, we need to require the HTTP module. The HTTP module creates an HTTP server that listens to server ports and gives a response back to the client.We can create a HTTP server with the help of http.createServer() method.
// ? To make HTTP requests in Node.js, there is a built-in module HTTP in Node.js to transfer data over the HTTP.To make requests via the HTTP module http.request() method is used.

// * url
// ? The ‘url’ module provides utilities for URL resolution and parsing. The getters and setters implement the properties of URL objects on the class prototype, and the URL class is available on the global object.

// * path
// TODO: https://nodejs.dev/learn/the-nodejs-path-module
// ? The path module provides a lot of very useful functionality to access and interact with the file system.
