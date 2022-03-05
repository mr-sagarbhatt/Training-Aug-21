const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const paymentSchema = new Schema(
  {
    _id: Number,
    transactionId: {
      type: String,
      max: [30, `Transaction id  must be less than or equal to 30 digits.`],
      required: [true, `Transaction id is required.`],
      alias: "razorpayPaymentId",
    },
    razorpaySignature: {
      type: String,
      max: [
        100,
        `Razorpay signature must be less than or equal to 100 digits.`,
      ],
      required: [true, `Razorpay signature is required.`],
    },
    razorpayOrderId: {
      type: String,
      max: [30, `Razorpay order id must be less than or equal to 30 digits.`],
      required: [true, `Razorpay order id is required.`],
    },
    amount: {
      type: Number,
      required: [true, `Amount is required.`],
      min: [0, `Amount must be greater than or equal to 0.`],
    },
    method: {
      type: String,
      alias: "paymentMethod",
      max: [20, `Payment method must be less than or equal to 20.`],
      required: [true, `Payment method is required.`],
    },
    status: {
      type: Boolean,
      required: [true, `Payment status is required.`],
      default: 0,
    },
    orderNo: {
      type: String,
      ref: "orderDetail",
      required: [true, `Order no is required.`],
      maxlength: [10, `Order no must be less than or equal to 10 characters.`],
      unique: [true, `Order no is already exists.`],
    },
    isActive: {
      type: Boolean,
      require: true,
      default: 1,
    },
  },
  { timestamps: true }
);

paymentSchema.plugin(AutoIncrement, {
  id: "payment_seq",
});

const PaymentModel = model("payment", paymentSchema);

module.exports = PaymentModel;
