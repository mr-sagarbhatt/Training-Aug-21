const BillingDomain = require("../domains/billing.domain");
const express = require("express");
const router = express.Router();
// *********** AUTH MIDDLE WARES ***********
const verifyToken = require("../authentication/verifyToken");
const { authPage } = require("../authentication/authorization");

class BillingController {
  // *********** GET ALL BILLS ***********
  static getAllBills(req, res) {
    const billingDomain = new BillingDomain();
    billingDomain.getAllBills(req, res);
  }
  // *********** CREATE BILL ***********
  static createBill(req, res) {
    const billingDomain = new BillingDomain();
    billingDomain.createBill(req, res);
  }
  // *********** UPDATE BILL ***********
  static updateBill(req, res) {
    const billingDomain = new BillingDomain();
    billingDomain.updateBill(req, res);
  }
  // *********** DELETE BILL ***********
  static deleteBill(req, res) {
    const billingDomain = new BillingDomain();
    billingDomain.deleteBill(req, res);
  }
}

// *********** BILLING ROUTES ***********
router.get("/", verifyToken, authPage([1, 2]), BillingController.getAllBills);
router.post("/", verifyToken, authPage([1, 2]), BillingController.createBill);
router.put(
  "/:billId",
  verifyToken,
  authPage([1, 2]),
  BillingController.updateBill
);
router.delete(
  "/:billId",
  verifyToken,
  authPage([1, 2]),
  BillingController.deleteBill
);

module.exports = router;
