const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

// const con = connection;
const AutoIncrement = AutoIncrementFactory(connection);
const { validateUserEmail } = require("../utils/mongoose.validations");

const userSchema = new Schema(
  {
    _id: Number,
    customerNumber: {
      type: Number,
      required: [true, `Customer number is required.`],
      unique: [true, `Customer number is already exists.`],
    },
    userName: {
      type: String,
      lowercase: true,
      required: [true, `Username is required.`],
      unique: [true, `Username is already exists.`],
      minlength: [5, `Username must be greater than or equal to 5 characters.`],
      maxlength: [
        255,
        `Username must be less than or equal to 255 characters.`,
      ],
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, `Email is required.`],
      unique: [true, `Email is already exists.`],
      maxlength: [255, `Email must be less than or equal to 255 characters.`],
      validate: {
        validator: validateUserEmail,
        message: (props) => `Email must be a valid email address.`,
      },
    },
    password: {
      type: String,
      // required: [true, `Password is required.`],
      minlength: [9, `Password must be greater than or equal to 9 characters.`],
      maxlength: [
        1024,
        `Password must be less than or equal to 1024 characters.`,
      ],
    },
    firebaseUId: {
      type: String,
      maxlength: [28, `UId must be less than or equal to 1024 characters.`],
      // required: [true, `UId is required.`],
      // unique: [true, `UId is already exists.`],
    },
    authTypeId: {
      type: Number,
      ref: "authType",
      required: [true, `Auth type id is required.`],
    },
    roleId: {
      type: Number,
      ref: "role",
      required: [true, `Role id is required.`],
      // default: 2,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

userSchema.post("save", async function (user) {
  const ProfileModel = require("../models/profile.model");
  const profile = new ProfileModel({ userId: user._id });
  const saveProfile = await profile.save();
  console.log(saveProfile);
});

userSchema.plugin(AutoIncrement, {
  id: "user_seq",
});

const UserModel = model("user", userSchema);

module.exports = UserModel;
