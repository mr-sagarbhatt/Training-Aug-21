const PromoDomain = require("../domains/promo.domain");
const express = require("express");
const router = express.Router();
const verifyToken = require("../authentication/verifyToken");
const { authPage } = require("../authentication/authorization");

class PromoController {
  // *********** GET ALL PROMOS ***********
  static getAllPromos(req, res) {
    const promoDomain = new PromoDomain();
    promoDomain.getAllPromos(req, res);
  }
  // *********** CREATE PROMO ***********
  static createPromo(req, res) {
    const promoDomain = new PromoDomain();
    promoDomain.createPromo(req, res);
  }
  // *********** UPDATE PROMO ***********
  static updatePromo(req, res) {
    const promoDomain = new PromoDomain();
    promoDomain.updatePromo(req, res);
  }
  // *********** DELETE/DEACTIVATE PROMO ***********
  static deletePromo(req, res) {
    const promoDomain = new PromoDomain();
    promoDomain.deletePromo(req, res);
  }
  // *********** ACTIVATE PROMO ***********
  static activatePromo(req, res) {
    const promoDomain = new PromoDomain();
    promoDomain.activatePromo(req, res);
  }
}

// *********** PROMO ROUTES ***********
router.get("/", PromoController.getAllPromos);
router.post("/", verifyToken, authPage([1]), PromoController.createPromo);
router.put(
  "/:promoId",
  verifyToken,
  authPage([1]),
  PromoController.updatePromo
);
router.delete(
  "/:promoId",
  verifyToken,
  authPage([1]),
  PromoController.deletePromo
);
router.put(
  "/activate/:promoId",
  verifyToken,
  authPage([1]),
  PromoController.activatePromo
);

module.exports = router;
