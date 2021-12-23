const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const promoSchema = new Schema(
  {
    _id: Number,
    promoCode: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      alias: "description",
    },
    percentage: {
      type: Number,
      alias: "promoPercentage",
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

promoSchema.plugin(AutoIncrement, {
  id: "promo_seq",
});

const PromoModel = model("promo", promoSchema);

module.exports = PromoModel;
