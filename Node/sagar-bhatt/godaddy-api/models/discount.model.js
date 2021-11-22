const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const discountSchema = new Schema(
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
    discountPercent: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
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
