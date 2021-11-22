const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const subscriptionDetailsSchema = new Schema(
  {
    _id: Number,
    total: {
      type: Number,
      required: true,
    },
    user: {
      type: Number,
      ref: "user",
      required: true,
    },
    subscriptionItemId: {
      type: Number,
      ref: "subscriptionItem",
      required: true,
    },
  },
  { timestamps: true }
);

subscriptionDetailsSchema.plugin(AutoIncrement, {
  id: "subscriptionDetails_seq",
});

const SubscriptionDetailsModel = model(
  "subscriptionDetail",
  subscriptionDetailsSchema
);

module.exports = SubscriptionDetailsModel;
