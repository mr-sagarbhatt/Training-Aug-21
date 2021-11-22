const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const paymentSchema = new Schema(
  {
    _id: Number,
    code: {
      type: String,
      requireD: true,
    },
    type: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    subscriptionDetailId: {
      type: Number,
      ref: "subscriptionDetail",
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
