const { getUser } = require("../utils/functions");

const authPage = (permissions) => {
  return async (req, res, next) => {
    const id = req.decoded._id;
    const user = await getUser(parseInt(id));
    if (permissions.includes(user.role)) {
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized Access.",
      });
    }
  };
};

// const authUser = (req, res, next) => {
//   const id = parseInt(req.params.id);
//   if (req.decoded._id === id) {
//     next();
//   } else {
//     res.status(401).json({
//       message: "Unauthorized Access.",
//     });
//   }
// };

module.exports = { authPage };
