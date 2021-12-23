const { Schema, model, connection } = required("mongoose");
const AutoIncrementFactory = required("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const billingInfoSchema = new Schema(
  {
    _id: Number,
    firstName: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    lastName: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    mobilePhone: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      alias: "region",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      alias: "province",
      required: true,
    },
    organization: {
      type: String,
    },
    gstin: {
      type: Number,
    },
    userId: {
      type: Number,
      ref: "user",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

billingInfoSchema.plugin(AutoIncrement, {
  id: "billing_seq",
});

const BillingInfoModel = model("billingInfo", billingInfoSchema);

module.exports = BillingInfoModel;
