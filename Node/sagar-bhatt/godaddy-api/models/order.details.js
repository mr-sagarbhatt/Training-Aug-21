const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const orderDetailsSchema = new Schema(
  {
    _id: Number,
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    // paymentId: {
    //   type: Number,
    //   required: true,
    // },
    isCompleted: {
      type: Boolean,
      required: true,
      default: 0,
    },
    promoId: {
      type: Number,
      ref: "promo",
    },
    userId: {
      type: Number,
      ref: "user",
      // required: true,
    },
  },
  { timestamps: true }
);

orderDetailsSchema.plugin(AutoIncrement, {
  id: "orderDetails_seq",
});

const OrderDetailsModel = model("orderDetail", orderDetailsSchema);

module.exports = OrderDetailsModel;
