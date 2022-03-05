// const prettyMilliseconds = require("pretty-ms");
const ms = require("ms");
const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const orderItemSchema = new Schema(
  {
    _id: Number,
    productId: {
      type: Number,
      ref: "product",
      required: [true, `Product id is required.`],
    },
    months: {
      type: Number,
      min: [1, `Months must be greater than or equal to 1.`],
      required: [true, `Months is required.`],
    },
    productPrice: {
      type: Number,
      min: [0, `Product price must be greater than or equal to 0.`],
      required: [true, `Product price is required.`],
    },
    startTime: {
      type: Date,
      min: [
        Date.now(),
        `Order start time must be greater than or equal to current date and time.`,
      ],
      required: [true, `Start time is required.`],
    },
    endTime: {
      type: Date,
      min: [
        Date.now(),
        `Order end time must be greater than or equal to current date and time.`,
      ],
      required: [true, `End time is required.`],
    },
    // auto renew?
    isRenewable: {
      type: Boolean,
      require: true,
      default: 1,
    },
    orderNo: {
      type: String,
      ref: "orderDetail",
      required: [true, `Order no is required.`],
      maxlength: [10, `Order no must be less than or equal to 10.`],
    },
    // remove record
    // createdAt: { type: Date, expires: `${this.months}m`, default: Date.now },
    // expireAt: {
    //   type: Date,
    //   // default: Date.now,
    //   default: Date,
    //   expires: "10s",
    // },
    isActive: {
      type: Boolean,
      require: true,
      default: 1,
    },
  },
  {
    timestamps: true,
    // remove record
    // timeseries: {
    //   timeField: "startTime",
    // },
    // autoCreate: false,
    // expireAfterSeconds: 10,
  }
);

orderItemSchema.index({ endTime: 1 }, { expireAfterSeconds: 0 });

// orderItemSchema.virtual("orderDetails", {
//   ref: "orderDetail",
//   localField: "orderId",
//   foreignField: "orderId",
//   justOne: true,
// });

orderItemSchema.pre("save", function (next) {
  this.expireAt = new Date();
  next();
});
// with { type: Date, expires: 15 }

orderItemSchema.plugin(AutoIncrement, {
  id: "orderItem_seq",
});

const OrderItemsModel = model("orderItem", orderItemSchema);

module.exports = OrderItemsModel;
