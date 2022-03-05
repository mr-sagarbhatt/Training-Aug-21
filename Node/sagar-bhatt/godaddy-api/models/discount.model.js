const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const discountSchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      maxlength: [30, `Name must be less than or equal to 30 characters.`],
    },
    desc: {
      type: String,
      maxlength: [
        1024,
        `Description must be less than or equal to 1024 characters.`,
      ],
      alias: "description",
    },
    percentage: {
      type: Number,
      alias: "discountPercentage",
      required: [true, `Discount percentage is required.`],
      min: [
        1,
        `Discount percentage must be greater than or equal to 1 characters.`,
      ],
      max: [
        100,
        `Discount percentage must be less than or equal to 100 characters.`,
      ],
    },
    months: {
      type: Number,
      min: [1, `Months must be greater than or equal to 1.`],
      required: [true, `Months is required.`],
    },
    productId: {
      type: Number,
      ref: "product",
      required: [true, `product id is required.`],
    },
    isActive: {
      type: Boolean,
      require: true,
      default: 1,
    },
  },
  { timestamps: true }
);

discountSchema.plugin(AutoIncrement, {
  id: "discount_seq",
});

const DiscountModel = model("discount", discountSchema);

module.exports = DiscountModel;
