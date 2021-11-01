const fs = require("fs");

fs.readFile("./data.json", (err, data) => {
  if (err) {
    return console.error(err);
  }
  console.log(data.toString());
});

data = [];
fs.appendFile("./data.json", JSON.stringify(data.push({ id: "1" })), (err) => {
  if (err) {
    return console.error(err);
  }
});

fs.open("./data.json", "w", function (err, file) {
  if (err) throw err;
  console.log("Saved!");
});

fs.open("./data.json", "r", function (err, file) {
  if (err) throw err;
  console.log("Saved!");
});

// * write
fs.writeFile(
  "./data.json",
  JSON.stringify(data.push({ id: "1" })),
  function (err) {
    if (err) throw err;
    console.log("Saved!");
  }
);

// * rename
fs.rename("data.json", "new-data.json", function (err) {
  if (err) throw err;
  console.log("File Renamed!");
});

// * delete

fs.unlink("new-data.json", function (err) {
  if (err) throw err;
  console.log("File deleted!");
});

// * fs module
// TODO: https://www.geeksforgeeks.org/node-js-file-system/
// ? To handle file operations like creating, reading, deleting, etc., Node.js provides an inbuilt module called FS (File System).Node.js gives the functionality of file I/O by providing wrappers around the standard POSIX functions. All file system operations can have synchronous and asynchronous forms depending upon user requirements.
