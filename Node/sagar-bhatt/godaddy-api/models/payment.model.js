const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const paymentSchema = new Schema(
  {
    _id: Number,
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    orderDetailId: {
      type: Number,
      ref: "orderDetail",
      required: true,
    },
  },
  { timestamps: true }
);

paymentSchema.plugin(AutoIncrement, {
  id: "payment_seq",
});

const PaymentModel = model("payment", paymentSchema);

module.exports = PaymentModel;
