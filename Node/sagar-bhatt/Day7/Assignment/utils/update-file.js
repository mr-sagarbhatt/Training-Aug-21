const chalk = require("chalk");
const { writeFile } = require("fs").promises;

// * UPDATE FILE AFTER POST-PUT-DELETE REQUEST
const updateFile = async (file, object) => {
  await writeFile(file, JSON.stringify(object));
};

module.exports = updateFile;
