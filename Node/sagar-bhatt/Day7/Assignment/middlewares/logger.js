const chalk = require("chalk");

// * LOGGER MIDDLEWARE
const logger = (req, res, next) => {
  console.log(
    chalk.magenta(`Logged ${req.url} ${req.method} -- ${new Date()}`)
  );
  next();
};

module.exports = logger;
