const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const subCategorySchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: true,
      unique: true,
      alias: "subCategoryName",
    },
    categoryId: {
      type: Number,
      ref: "category",
      required: true,
    },
  },
  { timestamps: true }
);

subCategorySchema.plugin(AutoIncrement, {
  id: "subCategory_seq",
});

const SubCategoryModel = model("subCategory", subCategorySchema);

module.exports = SubCategoryModel;
