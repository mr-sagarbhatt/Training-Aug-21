const { Schema, model } = require("mongoose");

const assistantSchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
      trim: true,
    },
    patients: [
      {
        type: Number,
        ref: "patient",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: true }
);

const AssistantModel = model("assistant", assistantSchema);

module.exports = AssistantModel;
