const { serverLogging } = require("../startup/logging");

// *********** LOGGER MIDDLEWARE ***********
const logger = (req, res, next) => {
  const msg = `Logged ${req.url} ${req.method}}`;
  serverLogging.info(msg);
  next();
};

module.exports = logger;
