const authPage = (permissions) => {
  return (req, res, next) => {
    const role = req.headers["role"];
    if (permissions.includes(role)) {
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized Access.",
      });
    }
  };
};

const authUser = (req, res, next) => {
  const id = parseInt(req.params.id);
  console.log(id);
  if (req.body.userId === id) {
    next();
  } else {
    res.status(401).json({
      message: "Unauthorized Access.",
    });
  }
};

module.exports = { authPage, authUser };
