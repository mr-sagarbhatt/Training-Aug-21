const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const subCategorySchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      alias: "subCategoryName",
      maxlength: [
        50,
        `SubCategory name must be less than or equal to 50 characters.`,
      ],
      unique: [true, `SubCategory name is already exists.`],
      required: [true, `SubCategory name is required.`],
    },
    slug: {
      type: String,
      required: true,
      maxlength: [
        50,
        `SubCategory slug must be less than or equal to 50 characters.`,
      ],
      unique: [true, `SubCategory slug is already exists.`],
      required: [true, `SubCategory slug is required.`],
    },
    desc: {
      type: String,
      maxlength: [
        1024,
        `Description must be less than or equal to 1024 characters.`,
      ],
      alias: "description",
    },
    extra: {
      type: [String],
    },
    categoryId: {
      type: Number,
      ref: "category",
      required: [true, `Category id is required.`],
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
