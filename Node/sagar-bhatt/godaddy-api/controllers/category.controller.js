const CategoryDomain = require("../domains/category.domain");
const express = require("express");
const router = express.Router();
const verifyToken = require("../authentication/verifyToken");
const { authPage } = require("../authentication/authorization");

class CategoryController {
  // *********** GET ALL CATEGORIES ***********
  static getAllCategories(req, res) {
    const categoryDomain = new CategoryDomain();
    categoryDomain.getAllCategories(req, res);
  }
  // *********** CREATE CATEGORY ***********
  static createCategory(req, res) {
    const categoryDomain = new CategoryDomain();
    categoryDomain.createCategory(req, res);
  }
  // *********** UPDATE CATEGORY ***********
  static updateCategory(req, res) {
    const categoryDomain = new CategoryDomain();
    categoryDomain.updateCategory(req, res);
  }
  // *********** DELETE/DEACTIVATE CATEGORY ***********
  static deleteCategory(req, res) {
    const categoryDomain = new CategoryDomain();
    categoryDomain.deleteCategory(req, res);
  }
  // *********** ACTIVATE CATEGORY ***********
  static activateCategory(req, res) {
    const categoryDomain = new CategoryDomain();
    categoryDomain.activateCategory(req, res);
  }
}

// *********** CATEGORY ROUTES ***********
router.get("/", CategoryController.getAllCategories);
router.post("/", verifyToken, authPage([1]), CategoryController.createCategory);
router.put(
  "/:categoryId",
  verifyToken,
  authPage([1]),
  CategoryController.updateCategory
);
router.delete(
  "/:categoryId",
  verifyToken,
  authPage([1]),
  CategoryController.deleteCategory
);
router.put(
  "/activate/:categoryId",
  verifyToken,
  authPage([1]),
  CategoryController.activateCategory
);

module.exports = router;
