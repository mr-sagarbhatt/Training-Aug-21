const port = process.env.PORT || 3001;
const logger = require("./middlewares/logger");

const express = require("express");
const app = express();

// *********** logging :: winston ***********
const { handleLogging, serverLogging } = require("./startup/logging");
handleLogging();

// *********** CONFIG :: cors, roles ***********
require("./startup/config")(app);

// *********** LOGGER MIDDLEWARE :: ENDPOINT ***********
app.use(logger);

// *********** ROUTES ***********
require("./startup/routes")(app);

// *********** DB :: MONGOOSE CONNECTION ***********
require("./startup/db")();

// *********** MODELS :: CREATED ON LOAD IF NOT EXISTS :: roles, authTypes ***********
require("./startup/models")();

// *********** PORT ***********
app.listen(port, () => {
  serverLogging.info(`Server started on port:${port}`);
});

module.exports = app;
