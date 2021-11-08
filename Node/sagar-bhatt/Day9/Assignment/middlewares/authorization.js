const authPage = (permissions) => {
  return (req, res, next) => {
    const userRole = req.body.role;
    if (permissions.includes(userRole)) {
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
  if (req.body.userId === id) {
    next();
  } else {
    res.status(401).json({
      message: "Unauthorized Access.",
    });
  }
};

module.exports = { authPage, authUser };
