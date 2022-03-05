const PromoModel = require("../models/promo.model");
const { validatePromo } = require("../utils/joi.validations");
const { getRandomPromoCode } = require("../utils/functions");

class DiscountDomain {
  // *********** GET ALL ACTIVE PROMOS ***********
  async getAllPromos(req, res, next) {
    try {
      const promo = await PromoModel.find({ isActive: 1 });
      if (promo.length > 0) {
        res.send(promo);
      } else {
        res.json({
          message: `No results found!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** CREATE PROMO ***********
  async createPromo(req, res, next) {
    try {
      let data = req.body;
      data = {
        ...data,
      };
      // * VALIDATE BODY DATA *
      const { error } = validatePromo(data);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      // * SAVE PROMO *
      data = {
        ...data,
        promoCode: await getRandomPromoCode(),
      };
      const promo = new PromoModel(data);
      const savePromo = await promo.save();
      if (savePromo) {
        res.send(savePromo);
      } else {
        res.status(400).json({
          message: "Please try again later!",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** UPDATE PROMO ***********
  async updatePromo(req, res, next) {
    try {
      const _id = parseInt(req.params.promoId);
      const data = req.body;
      // * VALIDATE BODY DATA *
      const { error } = validatePromo(data);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      // * UPDATE PROMO *
      if (data.endTime <= data.startTime) {
        throw new Error(`Promo end date must be greater than start time.`);
      } else {
        const promo = await PromoModel.findOneAndUpdate(
          { _id, isActive: 1 },
          { $set: data },
          { new: 1, runValidators: true }
        );
        if (promo) {
          res.send(promo);
        } else {
          res.status(400).json({
            message: "Promo Not Found!",
          });
        }
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** DELETE/DEACTIVATE PROMO ***********
  async deletePromo(req, res, next) {
    try {
      const _id = parseInt(req.params.promoId);
      const promo = await PromoModel.findByIdAndUpdate(
        { _id },
        { $set: { isActive: 0 } },
        { new: 1 }
      );
      if (promo) {
        res.send(promo);
      } else {
        res.status(400).json({
          message: "User Not Found!",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** ACTIVATE PROMO ***********
  async activatePromo(req, res, next) {
    try {
      const _id = parseInt(req.params.promoId);
      const promo = await PromoModel.findByIdAndUpdate(
        { _id },
        { $set: { isActive: 1 } },
        { new: 1 }
      );
      if (promo) {
        res.send(promo);
      } else {
        res.status(400).json({
          message: "User Not Found!",
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = DiscountDomain;
