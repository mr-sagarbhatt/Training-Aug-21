const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const discountSchema = new Schema(
  {
    _id: Number,
    // name: {
    //   type: String,
    //   required: true,
    // },
    desc: {
      type: String,
      alias: "description",
    },
    percentage: {
      type: Number,
      alias: "discountPercentage",
      required: true,
      min: 0,
      max: 100,
    },
    // startTime: {
    //   type: Date,
    // },
    // endTime: {
    //   type: Date,
    // },
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
