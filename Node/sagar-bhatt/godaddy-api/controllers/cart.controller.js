const CartDomain = require("../domains/cart.domain");
const express = require("express");
const router = express.Router();
// *********** AUTH MIDDLE WARES ***********
const verifyToken = require("../authentication/verifyToken");
const { authPage } = require("../authentication/authorization");

class CartController {
  // *********** GET USER CART ***********
  static getUserCart(req, res) {
    const cartDomain = new CartDomain();
    cartDomain.getUserCart(req, res);
  }
  // *********** CREATE CART ***********
  static addToCart(req, res) {
    const cartDomain = new CartDomain();
    cartDomain.addToCart(req, res);
  }
  // *********** UPDATE CART ***********
  static updateCartItem(req, res) {
    const cartDomain = new CartDomain();
    cartDomain.updateCartItem(req, res);
  }
  // *********** DELETE CART ITEMS ***********
  static deleteCartItem(req, res) {
    const cartDomain = new CartDomain();
    cartDomain.deleteCartItem(req, res);
  }
  // *********** DELETE CART ***********
  static deleteCart(req, res) {
    const cartDomain = new CartDomain();
    cartDomain.deleteCart(req, res);
  }
}

// *********** CART  ROUTES ***********
router.get("/", verifyToken, authPage([1, 2]), CartController.getUserCart);
router.post("/", verifyToken, authPage([1, 2]), CartController.addToCart);
router.put(
  "/:cartId",
  verifyToken,
  authPage([1, 2]),
  CartController.updateCartItem
);
router.delete(
  "/:cartId",
  verifyToken,
  authPage([1, 2]),
  CartController.deleteCartItem
);
router.delete("/", verifyToken, authPage([1, 2]), CartController.deleteCart);

module.exports = router;
