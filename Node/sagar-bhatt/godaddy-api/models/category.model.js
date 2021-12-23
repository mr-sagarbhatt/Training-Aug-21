const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const categorySchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: true,
      unique: true,
      alias: "categoryName",
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    desc: {
      type: String,
    },
    extra: {
      type: Array,
    },
    isActive: {
      type: Boolean,
      require: true,
      default: 1,
    },
  },
  { timestamps: true }
);

categorySchema.plugin(AutoIncrement, {
  id: "category_seq",
});

const CategoryModel = model("category", categorySchema);

module.exports = CategoryModel;
