const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const orderDetailsSchema = new Schema(
  {
    _id: Number,
    orderNo: {
      type: String,
      // required: [true, `Order no is required.`],
      maxlength: [10, `Order no must be less than or equal to 10 characters.`],
      unique: [true, `Order no is already exists.`],
    },
    total: {
      type: Number,
      required: [true, `Total is required.`],
      min: [0, `Total must be greater than or equal to 0.`],
    },
    promoId: {
      type: Number,
      ref: "promo",
    },
    updatedTotal: {
      type: Number,
      required: [true, `Updated total is required.`],
      min: [0, `Total must be greater than or equal to 0.`],
    },
    status: {
      type: Boolean, // ? completed
      required: [true, `Order status is required.`],
      default: 0,
      alias: "isCompleted",
    },
    userId: {
      type: Number,
      ref: "user",
      required: [true, `User id is required.`],
    },
    isActive: {
      type: Boolean,
      require: true,
      default: 1,
    },
  },
  { timestamps: true }
);

orderDetailsSchema.plugin(AutoIncrement, {
  id: "orderDetails_seq",
});

const OrderDetailsModel = model("orderDetail", orderDetailsSchema);

module.exports = OrderDetailsModel;
