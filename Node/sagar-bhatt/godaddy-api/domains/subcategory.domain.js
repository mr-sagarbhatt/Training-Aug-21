const SubCategoryModel = require("../models/subcategory.model");
const CategoryModel = require("../models/category.model");
const { validateSubCategory } = require("../utils/joi.validations");

class CategoryDomain {
  // *********** GET ALL ACTIVE SUB CATEGORIES ***********
  async getAllSubCategories(req, res, next) {
    try {
      const subCategory = await SubCategoryModel.find({ isActive: 1 }).populate(
        {
          path: "categoryId",
        }
      );
      if (subCategory.length > 0) {
        res.send(subCategory);
      } else {
        res.json({
          message: `No results found!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** CREATE SUB CATEGORY ***********
  async createSubCategory(req, res, next) {
    try {
      const data = req.body;
      // * VALIDATE BODY DATA *
      const { error } = validateSubCategory(data);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      // * CHECK IF CATEGORY ID EXISTS *
      const categoryId = await CategoryModel.findOne({ _id: data.categoryId });
      if (categoryId) {
        // * SAVE SUB CATEGORY *
        const subCategory = new SubCategoryModel(data);
        const saveSubCategory = await subCategory.save();
        if (saveSubCategory) {
          res.send(saveSubCategory);
        } else {
          res.status(400).json({
            message: "Please try again later!",
          });
        }
      } else {
        return res.status(400).json({
          message: `Category Not found!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** UPDATE SUB CATEGORY ***********
  async updateSubCategory(req, res, next) {
    try {
      const _id = parseInt(req.params.subCategoryId);
      const data = req.body;
      // * VALIDATE BODY DATA *
      const { error } = validateSubCategory(data);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      // * CHECK IF CATEGORY ID EXISTS *
      const categoryId = await CategoryModel.findOne({ _id: data.categoryId });
      if (categoryId) {
        // * UPDATE SUB CATEGORY *
        const subCategory = await SubCategoryModel.findOneAndUpdate(
          { _id, isActive: 1 },
          { $set: data },
          { new: 1, runValidators: true }
        );
        if (subCategory) {
          res.send(subCategory);
        } else {
          res.status(400).json({
            message: "SubCategory Not Found!",
          });
        }
      } else {
        return res.status(400).json({
          message: `Category Not found!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** DELETE/DEACTIVATE SUB CATEGORY ***********
  async deleteSubCategory(req, res, next) {
    try {
      const _id = parseInt(req.params.subCategoryId);
      const subCategory = await SubCategoryModel.findByIdAndUpdate(
        { _id },
        { $set: { isActive: 0 } },
        { new: 1 }
      );
      if (subCategory) {
        res.send(subCategory);
      } else {
        res.status(400).json({
          message: "SubCategory Not Found!",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** ACTIVATE SUB CATEGORY ***********
  async activateSubCategory(req, res, next) {
    try {
      const _id = parseInt(req.params.subCategoryId);
      const subCategory = await SubCategoryModel.findByIdAndUpdate(
        { _id },
        { $set: { isActive: 1 } },
        { new: 1 }
      );
      if (subCategory) {
        res.send(subCategory);
      } else {
        res.status(400).json({
          message: "SubCategory Not Found!",
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryDomain;
