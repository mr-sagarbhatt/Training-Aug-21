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
  },
  { timestamps: true }
);

categorySchema.plugin(AutoIncrement, {
  id: "category_seq",
});

const CategoryModel = model("category", categorySchema);

module.exports = CategoryModel;
