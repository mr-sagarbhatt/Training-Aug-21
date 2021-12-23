const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const orderItemSchema = new Schema(
  {
    _id: Number,
    productId: {
      type: Number,
      ref: "product",
      required: true,
    },
    months: {
      type: Number,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    // status: {
    //   type: String,
    //   required: true,
    // },
    orderDetailId: {
      type: Number,
      ref: "orderDetail",
      required: true,
    },
  },
  { timestamps: true }
);

orderItemSchema.plugin(AutoIncrement, {
  id: "orderItem_seq",
});

const OrderItemModel = model("orderItem", orderItemSchema);

module.exports = OrderItemModel;
