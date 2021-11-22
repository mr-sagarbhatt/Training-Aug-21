const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const productSchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: true,
      alias: "productName",
    },
    desc: {
      type: String,
      alias: "description",
    },
    price: {
      type: Number,
      required: true,
      alias: "pricePerMonth",
    },
    subCategoryId: {
      type: Number,
      ref: "subCategory",
      required: true,
    },
    discountId: {
      type: Number,
      ref: "discount",
    },
    isActive: {
      type: Boolean,
      default: 1,
    },
  },
  { timestamps: true }
);

productSchema.plugin(AutoIncrement, {
  id: "product_seq",
});

const ProductModel = model("product", productSchema);

module.exports = ProductModel;
