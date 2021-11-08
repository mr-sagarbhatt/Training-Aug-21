const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

router.get("/data", verifyToken, (req, res, next) => {
  let customerdata = [
    {
      customerid: 1,
      customername: "Sagar Bhatt",
    },
    {
      customerid: 2,
      customername: "Niraj Surati",
    },
    {
      customerid: 3,
      customername: "Harsh Patel",
    },
  ];
  res.json(customerdata);
});

module.exports = router;
