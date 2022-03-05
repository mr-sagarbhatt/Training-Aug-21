const DiscountDomain = require("../domains/discount.domain");
const express = require("express");
const router = express.Router();
const verifyToken = require("../authentication/verifyToken");
const { authPage } = require("../authentication/authorization");

class DiscountController {
  // *********** GET ALL DISCOUNTS ***********
  static getAllDiscounts(req, res) {
    const discountDomain = new DiscountDomain();
    discountDomain.getAllDiscounts(req, res);
  }
  // *********** GET DISCOUNTS BY PRODUCT ***********
  static getProductDiscounts(req, res) {
    const discountDomain = new DiscountDomain();
    discountDomain.getProductDiscounts(req, res);
  }
  // *********** CREATE DISCOUNT ***********
  static createDiscount(req, res) {
    const discountDomain = new DiscountDomain();
    discountDomain.createDiscount(req, res);
  }
  // *********** UPDATE DISCOUNT ***********
  static updateDiscount(req, res) {
    const discountDomain = new DiscountDomain();
    discountDomain.updateDiscount(req, res);
  }
  // *********** DELETE/DEACTIVATE DISCOUNT ***********
  static deleteDiscount(req, res) {
    const discountDomain = new DiscountDomain();
    discountDomain.deleteDiscount(req, res);
  }
  // *********** ACTIVATE DISCOUNT ***********
  static activateDiscount(req, res) {
    const discountDomain = new DiscountDomain();
    discountDomain.activateDiscount(req, res);
  }
}

// *********** DISCOUNT ROUTES ***********
router.get("/", DiscountController.getAllDiscounts);
router.get("/:productId", DiscountController.getProductDiscounts);
router.post("/", verifyToken, authPage([1]), DiscountController.createDiscount);
router.put(
  "/:discountId",
  verifyToken,
  authPage([1]),
  DiscountController.updateDiscount
);
router.delete(
  "/:discountId",
  verifyToken,
  authPage([1]),
  DiscountController.deleteDiscount
);
router.put(
  "/activate/:discountId",
  verifyToken,
  authPage([1]),
  DiscountController.activateDiscount
);

module.exports = router;
