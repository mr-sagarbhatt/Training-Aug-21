const BillingModel = require("../models/billing.info");
const { validateBilling } = require("../utils/joi.validations");

class BillDomain {
  // *********** GET ALL BILLS ***********
  async getAllBills(req, res, next) {
    try {
      const bill = await BillingModel.find();
      if (bill.length > 0) {
        res.send(bill);
      } else {
        res.json({
          message: `No results found!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** CREATE BILL ***********
  async createBill(req, res, next) {
    try {
      const data = req.body;
      // * VALIDATE BODY DATA *
      const { error } = validateBilling(data);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      // * SAVE BILL *
      const bill = new BillingModel(data);
      const saveBill = await bill.save();
      if (saveBill) {
        res.send(saveBill);
      } else {
        res.status(400).json({
          message: "Please try again later!",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** UPDATE BILL ***********
  async updateBill(req, res, next) {
    try {
      const _id = parseInt(req.params.billId);
      const data = req.body;
      // * VALIDATE BODY DATA *
      const { error } = validateBilling(data);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      // * UPDATE BILL *
      const bill = await BillingModel.findOneAndUpdate(
        { _id },
        { $set: data },
        { new: 1, runValidators: true }
      );
      if (bill) {
        res.send(bill);
      } else {
        res.status(400).json({
          message: "Bill Not Found!",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** DELETE BILL ***********
  async deleteBill(req, res, next) {
    try {
      const _id = parseInt(req.params.billId);
      const bill = await BillingModel.findByIdAndUpdate(
        { _id },
        { $set: { isActive: 0 } },
        { new: 1 }
      );
      if (bill) {
        res.send(bill);
      } else {
        res.status(400).json({
          message: "Bill Not Found!",
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BillDomain;
