const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const profileSchema = new Schema(
  {
    _id: Number,
    firstName: {
      type: String,
      minlength: 2,
      maxlength: 30,
      sparse: true,
    },
    lastName: {
      type: String,
      minlength: 2,
      maxlength: 30,
    },
    organization: {
      type: String,
      minlength: 2,
      maxlength: 100,
    },
    defaultCurrency: {
      type: String,
    },
    primaryPhone: {
      type: Number,
    },
    mobilePhone: {
      type: Number,
    },
    homePhone: {
      type: Number,
    },
    fax: {
      type: Number,
    },
    country: {
      type: String,
      alias: "region",
    },
    address: {
      type: String,
    },
    address2: {
      type: String,
    },
    postalCode: {
      type: Number,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
      alias: "province",
    },
    user: {
      type: Number,
      ref: "user",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

profileSchema.plugin(AutoIncrement, {
  id: "profile_seq",
});

const ProfileModel = model("profile", profileSchema);

module.exports = ProfileModel;
