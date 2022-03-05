const DiscountModel = require("../models/discount.model");
const ProductModel = require("../models/product.model");
const { validateDiscount } = require("../utils/joi.validations");

class DiscountDomain {
  // *********** GET ALL ACTIVE DISCOUNTS ***********
  async getAllDiscounts(req, res, next) {
    try {
      const discount = await DiscountModel.find({ isActive: 1 }).populate({
        path: "productId",
      });
      if (discount.length > 0) {
        res.send(discount);
      } else {
        res.json({
          message: `No results found!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** GET DISCOUNTS BY PRODUCT ***********
  async getProductDiscounts(req, res, next) {
    try {
      const productId = req.params.productId;
      const discount = await DiscountModel.find({
        isActive: 1,
        productId,
      }).populate({
        path: "productId",
      });
      if (discount.length > 0) {
        res.send(discount);
      } else {
        res.json({
          message: `No results found!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** CREATE DISCOUNT ***********
  async createDiscount(req, res, next) {
    try {
      const data = req.body;
      // * VALIDATE BODY DATA *
      const { error } = validateDiscount(data);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      // * CHECK IF PRODUCT ID EXISTS *
      const productId = await ProductModel.findOne({
        _id: data.productId,
      });
      if (productId) {
        // * SAVE DISCOUNT *
        const discount = new DiscountModel(data);
        const saveDiscount = await discount.save();
        if (saveDiscount) {
          res.send(saveDiscount);
        } else {
          res.status(400).json({
            message: "Please try again later!",
          });
        }
      } else {
        return res.status(400).json({
          message: `Product Not found!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** UPDATE DISCOUNT ***********
  async updateDiscount(req, res, next) {
    try {
      const _id = parseInt(req.params.discountId);
      const data = req.body;
      // * VALIDATE BODY DATA *
      const { error } = validateDiscount(data);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      // * CHECK IF PRODUCT ID EXISTS *
      const productId = await ProductModel.findOne({
        _id: data.productId,
      });
      if (productId) {
        // * UPDATE DISCOUNT *
        if (data.endTime <= data.startTime) {
          throw new Error(`Discount end date must be greater than start time.`);
        } else {
          const discount = await DiscountModel.findOneAndUpdate(
            { _id, isActive: 1 },
            { $set: data },
            { new: 1, runValidators: true }
          );
          if (discount) {
            res.send(discount);
          } else {
            res.status(400).json({
              message: "Discount Not Found!",
            });
          }
        }
      } else {
        return res.status(400).json({
          message: `Product Not found!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** DELETE/DEACTIVATE DISCOUNT ***********
  async deleteDiscount(req, res, next) {
    try {
      const _id = parseInt(req.params.discountId);
      const discount = await DiscountModel.findByIdAndUpdate(
        { _id },
        { $set: { isActive: 0 } },
        { new: 1 }
      );
      if (discount) {
        res.send(discount);
      } else {
        res.status(400).json({
          message: "Discount Not Found!",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** ACTIVATE DISCOUNT ***********
  async activateDiscount(req, res, next) {
    try {
      const _id = parseInt(req.params.discountId);
      const discount = await DiscountModel.findByIdAndUpdate(
        { _id },
        { $set: { isActive: 1 } },
        { new: 1 }
      );
      if (discount) {
        res.send(discount);
      } else {
        res.status(400).json({
          message: "Discount Not Found!",
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = DiscountDomain;
