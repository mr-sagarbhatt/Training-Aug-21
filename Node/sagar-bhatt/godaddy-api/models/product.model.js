const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const productSchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      alias: "productName",
      maxlength: [
        100,
        `Product name must be less than or equal to 100 characters.`,
      ],
      unique: [true, `Product name is already exists.`],
      required: [true, `Product name is required.`],
    },
    desc: {
      type: String,
      alias: "description",
      maxlength: [
        1024,
        `Description must be less than or equal to 1024 characters.`,
      ],
    },
    extras: {
      type: [String],
    },
    price: {
      type: Number,
      alias: "pricePerMonth",
      min: [0, `Product price must be greater than or equal to 0.`],
      required: [true, `Product price is required.`],
    },
    featured: {
      type: Boolean,
      default: 0,
    },
    subCategoryId: {
      type: Number,
      ref: "subCategory",
      required: [true, `SubCategory id is required.`],
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
