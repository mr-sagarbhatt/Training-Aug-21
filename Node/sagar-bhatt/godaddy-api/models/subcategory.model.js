const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const subCategorySchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: true,
      alias: "subCategoryName",
    },
    slug: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    extra: {
      type: Array,
    },
    categoryId: {
      type: Number,
      ref: "category",
      required: true,
    },
    isActive: {
      type: Boolean,
      require: true,
      default: 1,
    },
  },
  { timestamps: true }
);

subCategorySchema.plugin(AutoIncrement, {
  id: "subCategory_seq",
});

const SubCategoryModel = model("subCategory", subCategorySchema);

module.exports = SubCategoryModel;
