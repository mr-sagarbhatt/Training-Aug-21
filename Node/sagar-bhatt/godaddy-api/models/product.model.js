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
    extras: {
      type: Array,
    },
    price: {
      type: Number,
      required: true,
      alias: "pricePerMonth",
      min: 0,
    },
    discountId: {
      type: Number,
      ref: "discount",
    },
    featured: {
      type: Boolean,
      default: 0,
    },
    subCategoryId: {
      type: Number,
      ref: "subCategory",
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
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
