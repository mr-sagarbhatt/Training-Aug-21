const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

// const con = connection;
const AutoIncrement = AutoIncrementFactory(connection);

const userSchema = new Schema(
  {
    _id: Number,
    customerNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    role: {
      type: Number,
      ref: "role",
      required: true,
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

userSchema.plugin(AutoIncrement, {
  id: "user_seq",
});

const UserModel = model("user", userSchema);

module.exports = UserModel;
