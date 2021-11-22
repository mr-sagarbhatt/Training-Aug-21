const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const subscriptionItemSchema = new Schema(
  {
    _id: Number,
    productId: {
      type: Number,
      ref: "product",
    },
    productPrice: {
      type: Number,
      required: true,
    },
    months: {
      type: Number,
      required: true,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    subscriptionDetailId: {
      type: Number,
      ref: "subscriptionDetail",
    },
  },
  { timestamps: true }
);

subscriptionItemSchema.plugin(AutoIncrement, {
  id: "subscriptionItem_seq",
});

const SubscriptionItemModel = model("subscriptionItem", subscriptionItemSchema);

module.exports = SubscriptionItemModel;
