const { serverLogging } = require("../startup/logging");
const { capitalize } = require("../utils/functions");

// *********** HANDLE DUPLICATES :: email, username ***********
const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);
  const code = 400;
  const capField = capitalize(field[0]);
  res.status(code).json({
    message: `${capField} already exists.`,
  });
};

// *********** ERROR CONTROLLER FUNCTION ***********
module.exports = (err, req, res, next) => {
  try {
    if (err.code && err.code == 11000) {
      serverLogging.error(err.message, err);
      return (err = handleDuplicateKeyError(err, res));
    } else {
      serverLogging.error(err.message);
      res.status(400).json({
        message: err.message,
      });
    }
  } catch (err) {
    serverLogging.error(err.message, err);
    res.status(500).json({
      message: `An unknown error occurred.`,
    });
  }
};
