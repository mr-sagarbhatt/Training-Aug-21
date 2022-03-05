const SubCategoryDomain = require("../domains/subcategory.domain");
const express = require("express");
const router = express.Router();
const verifyToken = require("../authentication/verifyToken");
const { authPage } = require("../authentication/authorization");

class SubCategoryController {
  // *********** GET ALL SUB CATEGORIES ***********
  static getAllSubCategories(req, res) {
    const subCategoryDomain = new SubCategoryDomain();
    subCategoryDomain.getAllSubCategories(req, res);
  }
  // *********** CREATE SUB CATEGORY ***********
  static createSubCategory(req, res) {
    const subCategoryDomain = new SubCategoryDomain();
    subCategoryDomain.createSubCategory(req, res);
  }
  // *********** UPDATE SUB CATEGORY ***********
  static updateSubCategory(req, res) {
    const subCategoryDomain = new SubCategoryDomain();
    subCategoryDomain.updateSubCategory(req, res);
  }
  // *********** DELETE/DEACTIVATE SUB CATEGORY ***********
  static deleteSubCategory(req, res) {
    const subCategoryDomain = new SubCategoryDomain();
    subCategoryDomain.deleteSubCategory(req, res);
  }
  // *********** ACTIVATE SUB CATEGORY ***********
  static activateSubCategory(req, res) {
    const subCategoryDomain = new SubCategoryDomain();
    subCategoryDomain.activateSubCategory(req, res);
  }
}

// *********** SUB CATEGORY ROUTES ***********
router.get("/", SubCategoryController.getAllSubCategories);
router.post("/", SubCategoryController.createSubCategory);
router.put("/:subCategoryId", SubCategoryController.updateSubCategory);
router.delete("/:subCategoryId", SubCategoryController.deleteSubCategory);
router.put(
  "/activate/:subCategoryId",
  SubCategoryController.activateSubCategory
);

module.exports = router;
