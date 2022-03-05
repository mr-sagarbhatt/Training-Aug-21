const cors = require("cors"); // * allow to send the request to the API server.

module.exports = function (app) {
  // *********** ALLOW PORT 3000 TO ACCESS RESOURCES ***********
  app.options(
    "*",
    cors({
      origin: "http://localhost:3000",
      optionsSuccessStatus: 200,
      "Access-Control-Expose-Headers": "X-Total-Count",
    })
  );
  app.use(
    cors({
      origin: "http://localhost:3000",
      optionsSuccessStatus: 200,
      "Access-Control-Expose-Headers": "X-Total-Count",
    })
  );
};
