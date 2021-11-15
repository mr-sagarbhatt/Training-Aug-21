const { Schema, model } = require("mongoose");

// * USER SCHEMA
const userSchema = new Schema(
  {
    _id: Number,
    userName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 8,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 8,
      lowercase: true,
    },
    role: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["student", "employee", "admin"],
    },
  },
  { timestamps: true }
);

// * USER MODEL
const UserModel = model("UserDetail", userSchema);

module.exports = UserModel;
