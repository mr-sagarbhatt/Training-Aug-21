const { getUser } = require("../utils/functions");

// *********** AUTHENTICATE PAGE ACCESS ***********
const authPage = (permissions) => {
  return async (req, res, next) => {
    const loggedUId = parseInt(req.decoded._id);
    const user = await getUser(loggedUId);
    if (permissions.includes(user.roleId)) {
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized Access!",
      });
    }
  };
};

// *********** AUTHENTICATE USER ACCESS ***********
// const authUser = (permissions) => {
//   return async (req, res, next) => {
//     const id = parseInt(req.params.userId);
//     const user = await getUser(id);
//     const loggedUId = parseInt(req.decoded._id);
//     const loggedUser = await getUser(loggedUId);
//     if (permissions.includes(loggedUser.roleId)) {
//       next();
//     } else if (loggedUId === id) {
//       next();
//     } else {
//       res.status(403).json({
//         message: "You don't have permission!",
//       });
//     }
//   };
// };

// const authUser = (permissions) => {
//   return async (req, res, next) => {
//     const id = parseInt(req.params.userId);
//     const loggedUId = req.decoded._id;
//     if (loggedUId === id) {
//       next();
//     } else {
//       const loggedUser = await getUser(loggedUId);
//       if (permissions.includes(loggedUser.roleId)) {
//         const user = await getUser(id);
//         if (loggedUser.roleId !== user.roleId) {
//           next();
//         } else {
//           res.status(403).json({
//             message: "You don't have permission!",
//           });
//         }
//       } else {
//         res.status(403).json({
//           message: "You don't have permission!",
//         });
//       }
//     }
//   };
// };

module.exports = { authPage };
