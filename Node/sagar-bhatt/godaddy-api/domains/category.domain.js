const CategoryModel = require("../models/category.model");
const { validateCategory } = require("../utils/joi.validations");

class CategoryDomain {
  // *********** GET ALL ACTIVE CATEGORIES ***********
  async getAllCategories(req, res, next) {
    try {
      const category = await CategoryModel.find({ isActive: 1 }).populate({
        path: "serviceId",
      });
      if (category.length > 0) {
        res.send(category);
      } else {
        res.json({
          message: `No results found!`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** CREATE CATEGORY ***********
  async createCategory(req, res, next) {
    try {
      const data = req.body;
      // * VALIDATE BODY DATA *
      const { error } = validateCategory(data);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      // * SAVE CATEGORY *
      const category = new CategoryModel(data);
      const saveCategory = await category.save();
      if (saveCategory) {
        res.send(saveCategory);
      } else {
        res.status(400).json({
          message: "Please try again later!",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** UPDATE CATEGORY ***********
  async updateCategory(req, res, next) {
    try {
      const _id = parseInt(req.params.categoryId);
      const data = req.body;
      // * VALIDATE BODY DATA *
      const { error } = validateCategory(data);
      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }
      // * UPDATE CATEGORY *
      const category = await CategoryModel.findOneAndUpdate(
        { _id, isActive: 1 },
        { $set: data },
        { new: 1, runValidators: true }
      );
      if (category) {
        res.send(category);
      } else {
        res.status(400).json({
          message: "Category Not Found!",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** DELETE CATEGORY ***********
  async deleteCategory(req, res, next) {
    try {
      const _id = parseInt(req.params.categoryId);
      const category = await CategoryModel.findByIdAndUpdate(
        { _id },
        { $set: { isActive: 0 } },
        { new: 1 }
      );
      if (category) {
        res.send(category);
      } else {
        res.status(400).json({
          message: "Category Not Found!",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // *********** ACTIVATE CATEGORY ***********
  async activateCategory(req, res, next) {
    try {
      const _id = parseInt(req.params.categoryId);
      const category = await CategoryModel.findByIdAndUpdate(
        { _id },
        { $set: { isActive: 1 } },
        { new: 1 }
      );
      if (category) {
        res.send(category);
      } else {
        res.status(400).json({
          message: "Category Not Found!",
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryDomain;
