const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const promoSchema = new Schema(
  {
    _id: Number,
    promoCode: {
      type: String,
      maxlength: [
        10,
        `Promo Code must be less than or equal to 10 characters.`,
      ],
      unique: [true, `Promo code is already exists.`],
      required: [true, `Promo code is required.`],
    },
    name: {
      type: String,
      maxlength: [30, `Name must be less than or equal to 30 characters.`],
      unique: [true, `Name is already exists.`],
      required: [true, `Name is required.`],
    },
    desc: {
      type: String,
      maxlength: [
        1024,
        `Description must be less than or equal to 1024 characters.`,
      ],
      alias: "description",
    },
    amount: {
      type: Number,
      alias: "promoAmount",
      required: [true, `Promo amount is required.`],
      min: [1, `Promo amount must be greater than or equal to 1.`],
      // max: [100, `Promo amount must be less than or equal to 100.`],
    },
    startTime: {
      type: Date,
      min: [
        Date.now(),
        `Promo start time must be greater than or equal to current date and time.`,
      ],
      required: [true, `Start time is required.`],
    },
    endTime: {
      type: Date,
      min: [
        Date.now(),
        `Promo end time must be greater than or equal to current date and time.`,
      ],
      required: [true, `End time is required.`],
    },
    isActive: {
      type: Boolean,
      require: true,
      default: 1,
    },
  },
  { timestamps: true }
);

promoSchema.pre("save", function (next) {
  if (this.endTime <= this.startTime) {
    next(new Error(`Promo end date must be greater than start time.`));
  }
  next();
});

promoSchema.plugin(AutoIncrement, {
  id: "promo_seq",
});

const PromoModel = model("promo", promoSchema);

module.exports = PromoModel;
