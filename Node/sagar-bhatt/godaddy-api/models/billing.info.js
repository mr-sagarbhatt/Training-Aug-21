const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");
const { validatePhoneNo } = require("../utils/mongoose.validations");

const AutoIncrement = AutoIncrementFactory(connection);
const postalCodeRegex = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;

const billingInfoSchema = new Schema(
  {
    _id: Number,
    firstName: {
      type: String,
      trim: true,
      maxlength: [
        20,
        `First name must be less than or equal to 20 characters.`,
      ],
      match: [/^[a-z]+$/, `First name can only contain lowercase letters.`],
      required: [true, `First name is required.`],
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [20, `Last name must be less than or equal to 20 characters.`],
      match: [/^[a-z]+$/, `Last name can only contain lowercase letters.`],
      required: [true, `Last name is required.`],
    },
    mobilePhone: {
      type: String,
      required: [true, `Mobile phone is required.`],
      validate: {
        validator: validatePhoneNo,
        message: (props) => `Mobile phone must be valid.`,
      },
    },
    country: {
      type: String,
      trim: true,
      alias: "region",
      maxlength: [20, `Country must be less than or equal to 20 characters.`],
      required: [true, `Country is required.`],
    },
    address1: {
      type: String,
      trim: true,
      maxlength: [
        100,
        `Address1 must be less than or equal to 100 characters.`,
      ],
      required: [true, `Address1 is required.`],
    },
    address2: {
      type: String,
      trim: true,
      maxlength: [
        100,
        `Address1 must be less than or equal to 100 characters.`,
      ],
    },
    postalCode: {
      type: Number,
      alias: "pinCode",
      match: [postalCodeRegex, `Postal code must be valid.`],
      required: [true, `Postal code is required.`],
    },
    city: {
      type: String,
      trim: true,
      maxlength: [30, `City must be less than or equal to 30 characters.`],
      required: [true, `City is required.`],
    },
    state: {
      type: String,
      trim: true,
      alias: "province",
      maxlength: [30, `State must be less than or equal to 30 characters.`],
      required: [true, `State is required.`],
    },
    organization: {
      type: String,
      trim: true,
      maxlength: [
        60,
        `Organization must be less than or equal to 60 characters.`,
      ],
    },
    gstIn: {
      type: String,
      maxlength: [15, `Gst no must be less than or equal to 15 characters.`],
      trim: true,
    },
    userId: {
      type: Number,
      ref: "user",
      required: [true, `User id is required.`],
    },
    // orderNo: {
    //   type: String,
    //   required: [true, `Order no is required.`],
    //   maxlength: [10, `Order no must be less than or equal to 10 characters.`],
    //   unique: [true, `Order no is already exists.`],
    // },
    isActive: {
      type: Boolean,
      require: true,
      default: 1,
    },
  },
  { timestamps: true }
);

billingInfoSchema.plugin(AutoIncrement, {
  id: "billing_seq",
});

const BillingInfoModel = model("billingInfo", billingInfoSchema);

module.exports = BillingInfoModel;
