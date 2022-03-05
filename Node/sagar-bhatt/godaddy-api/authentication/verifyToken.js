const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  jwt.verify(
    token,
    global.config.secretKey,
    {
      algorithm: global.config.algorithm,
    },
    (err, decoded) => {
      if (err) {
        const errData = {
          message: err.message,
          expiredAt: err.expiredAt,
        };
        // console.log(errData);
        return res.status(401).json({
          message: "Unauthorized Access",
        });
      } else {
        req.decoded = decoded;
        // console.log(req.decoded);
        next();
      }
    }
  );
};

module.exports = verifyToken;
