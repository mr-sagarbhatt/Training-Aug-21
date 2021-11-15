const { Schema, model } = require("mongoose");

// * STUDENT SCHEMA
const studentSchema = new Schema(
  {
    _id: Number,
    name: { type: String, required: true, lowercase: true },
    address: { type: String, required: true, lowercase: true },
    fees: [
      {
        amount: {
          type: Number,
          required: true,
        },
        paymentDate: {
          type: Date,
          required: true,
        },
        status: {
          type: Boolean,
          required: true,
        },
      },
    ],
    result: [
      {
        hindi: {
          type: Number,
          required: true,
        },
        eng: {
          type: Number,
          required: true,
        },
        maths: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
        grade: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// * STUDENT MODEL
const studentModel = model("StudentDetail", studentSchema);

module.exports = studentModel;
