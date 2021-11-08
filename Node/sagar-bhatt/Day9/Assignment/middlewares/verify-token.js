const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["user-access-token"];
  jwt.verify(
    token,
    global.config.secretKey,
    global.config.algorithm,
    (err, decoded) => {
      if (err) {
        const errorData = {
          message: err.message,
          expiredAt: err.expiredAt,
        };
        console.log(errorData);
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
};

module.exports = verifyToken;
