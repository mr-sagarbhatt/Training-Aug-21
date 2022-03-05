const OrderDomain = require("../domains/order.domain");
const express = require("express");
const router = express.Router();
// *********** AUTH MIDDLE WARES ***********
const verifyToken = require("../authentication/verifyToken");
const { authPage } = require("../authentication/authorization");

class OrderController {
  // *********** GET ALL ORDER ***********
  static getAllOrder(req, res) {
    const orderDomain = new OrderDomain();
    orderDomain.getAllOrder(req, res);
  }
  // *********** GET ORDER BY ORDER NO ***********
  static getOrderByNo(req, res) {
    const orderDomain = new OrderDomain();
    orderDomain.getOrderByNo(req, res);
  }
  // *********** GET ORDER BY USER ***********
  static getOrderByUser(req, res) {
    const orderDomain = new OrderDomain();
    orderDomain.getOrderByUser(req, res);
  }
  // *********** CREATE ORDER ***********
  static createOrder(req, res) {
    const orderDomain = new OrderDomain();
    orderDomain.createOrder(req, res);
  }
  // *********** UPDATE ORDER ***********
  static updateOrder(req, res) {
    const orderDomain = new OrderDomain();
    orderDomain.updateOrder(req, res);
  }
  // *********** DELETE ORDER ***********
  static deleteOrder(req, res) {
    const orderDomain = new OrderDomain();
    orderDomain.deleteOrder(req, res);
  }

  // *********** VERIFY AND CAPTURE PAYMENT ***********
  static razorpayVerifyPayment(req, res) {
    const orderDomain = new OrderDomain();
    orderDomain.razorpayVerifyPayment(req, res);
  }
}

// *********** ORDER  ROUTES ***********
router.get("/", verifyToken, authPage([1, 2]), OrderController.getAllOrder);
router.get(
  "/user",
  verifyToken,
  authPage([1, 2]),
  OrderController.getOrderByUser
);
router.get(
  "/:orderNo",
  verifyToken,
  authPage([1, 2]),
  OrderController.getOrderByNo
);
router.post("/", verifyToken, authPage([1, 2]), OrderController.createOrder);
router.post(
  "/razorpay/verifyPayment",
  verifyToken,
  authPage([1, 2]),
  OrderController.razorpayVerifyPayment
);
router.put(
  "/:orderId",
  verifyToken,
  authPage([1, 2]),
  OrderController.updateOrder
);
router.delete(
  "/:orderId",
  verifyToken,
  authPage([1, 2]),
  OrderController.deleteOrder
);

module.exports = router;
