const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");
const { validatePhoneNo } = require("../utils/mongoose.validations");

const AutoIncrement = AutoIncrementFactory(connection);

const faxRegex =
  /^(\+?\d{1,}(\s?|\-?)\d*(\s?|\-?)\(?\d{2,}\)?(\s?|\-?)\d{3,}\s?\d{3,})$/;
const postalCodeRegex = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;

const profileSchema = new Schema(
  {
    _id: Number,
    firstName: {
      type: String,
      trim: true,
      // minlength: [
      //   2,
      //   `First name must be greater than or equal to 2 characters.`,
      // ],
      maxlength: [
        20,
        `First name must be less than or equal to 20 characters.`,
      ],
      match: [/^[a-z]+$/, `First name can only contain lowercase letters.`],
      // required: [true, `First name is required.`],
    },
    lastName: {
      type: String,
      trim: true,
      // minlength: [
      //   2,
      //   `Last name must be greater than or equal to 2 characters.`,
      // ],
      maxlength: [20, `Last name must be less than or equal to 20 characters.`],
      match: [/^[a-z]+$/, `Last name can only contain lowercase letters.`],
      // required: [true, `Last name is required.`],
    },
    organization: {
      type: String,
      trim: true,
      maxlength: [
        60,
        `Organization must be less than or equal to 60 characters.`,
      ],
    },
    defaultCurrency: {
      type: String,
      trim: true,
      maxlength: [20, `Currency must be less than or equal to 20 characters.`],
    },
    primaryPhone: {
      type: String,
      trim: true,
      validate: {
        validator: validatePhoneNo,
        message: (props) => `Primary phone must be valid.`,
      },
      // required: [true, `Primary phone is required.`],
    },
    mobilePhone: {
      type: String,
      trim: true,
      validate: {
        validator: validatePhoneNo,
        message: (props) => `Mobile phone must be valid.`,
      },
    },
    homePhone: {
      type: String,
      trim: true,
      validate: {
        validator: validatePhoneNo,
        message: (props) => `Home phone must be valid.`,
      },
    },
    fax: {
      type: String,
      trim: true,
      match: [faxRegex, `Fax must be valid.`],
    },
    language: {
      type: String,
      maxlength: [20, `Language must be less than or equal to 20 characters.`],
    },
    country: {
      type: String,
      alias: "region",
      maxlength: [30, `Country must be less than or equal to 30 characters.`],
      // required: [true, `Country is required.`],
    },
    address1: {
      type: String,
      maxlength: [
        100,
        `Address1 must be less than or equal to 100 characters.`,
      ],
      // required: [true, `Address1 is required.`],
    },
    address2: {
      type: String,
      maxlength: [
        100,
        `Address2 must be less than or equal to 100 characters.`,
      ],
    },
    postalCode: {
      type: Number,
      alias: "pinCode",
      match: [postalCodeRegex, `Postal code must be valid.`],
      // required: [true, `Postal code is required.`],
    },
    city: {
      type: String,
      maxlength: [30, `City must be less than or equal to 30 characters.`],
      // required: [true, `City is required.`],
    },
    state: {
      type: String,
      alias: "province",
      maxlength: [30, `State must be less than or equal to 30 characters.`],
      // required: [true, `State is required.`],
    },
    isActive: {
      type: Boolean,
      // required: true,
      default: 1,
    },
    userId: {
      type: Number,
      ref: "user",
      required: [true, `User id is required.`],
      unique: [true, `User already exists.`],
    },
  },
  { timestamps: true }
);

profileSchema.plugin(AutoIncrement, {
  id: "profile_seq",
});

const ProfileModel = model("profile", profileSchema);

module.exports = ProfileModel;
