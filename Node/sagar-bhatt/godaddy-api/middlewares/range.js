module.exports = (req, res, next) => {
  res.header("Content-Range", "category 0-20/20");
};
