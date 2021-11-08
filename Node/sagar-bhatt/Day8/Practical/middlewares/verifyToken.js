const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // * GETTING TOKEN FROM HEADERS
  const token = req.headers["x-access-token"];

  // * VERIFYING TOKEN
  jwt.verify(
    token,
    global.config.secretKey,
    { algorithm: global.config.algorithm },
    (err, decoded) => {
      if (err) {
        const errorData = {
          message: err.message,
          expiredAt: err.expiredAt,
        };
        console.error(errorData);
        res.status(401).json({
          message: "Unauthorized Access.",
        });
      } else {
        req.decoded = decoded;
        console.log(decoded);
        next();
      }
    }
  );
}

module.exports = verifyToken;
