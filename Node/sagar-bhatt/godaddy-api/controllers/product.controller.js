const ProductDomain = require("../domains/product.domain");
const express = require("express");
const router = express.Router();
const verifyToken = require("../authentication/verifyToken");
const { authPage } = require("../authentication/authorization");

class ProductController {
  // *********** GET ALL PRODUCTS ***********
  static getAllProducts(req, res) {
    const productDomain = new ProductDomain();
    productDomain.getAllProducts(req, res);
  }
  // *********** CREATE PRODUCT ***********
  static createProduct(req, res) {
    const productDomain = new ProductDomain();
    productDomain.createProduct(req, res);
  }
  // *********** UPDATE PRODUCT ***********
  static updateProduct(req, res) {
    const productDomain = new ProductDomain();
    productDomain.updateProduct(req, res);
  }
  // *********** DELETE/DEACTIVATE PRODUCT ***********
  static deleteProduct(req, res) {
    const productDomain = new ProductDomain();
    productDomain.deleteProduct(req, res);
  }
  // *********** ACTIVATE PRODUCT ***********
  static activateProduct(req, res) {
    const productDomain = new ProductDomain();
    productDomain.activateProduct(req, res);
  }
}

// *********** PRODUCT ROUTES ***********
router.get("/", ProductController.getAllProducts);
router.post("/", verifyToken, authPage([1]), ProductController.createProduct);
router.put(
  "/:productId",
  verifyToken,
  authPage([1]),
  ProductController.updateProduct
);
router.delete(
  "/:productId",
  verifyToken,
  authPage([1]),
  ProductController.deleteProduct
);
router.put(
  "/activate/:productId",
  verifyToken,
  authPage([1]),
  ProductController.activateProduct
);

module.exports = router;
