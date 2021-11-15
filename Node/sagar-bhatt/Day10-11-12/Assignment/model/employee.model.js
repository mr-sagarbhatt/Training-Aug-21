const { Schema, model } = require("mongoose");

// * EMPLOYEE SCHEMA
const employeeSchema = new Schema(
  {
    _id: Number,
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    assignments: [
      {
        _id: {
          type: Number,
          unique: true,
          required: true,
        },
        assignmentName: {
          type: String,
          required: true,
          lowercase: true,
          trim: true,
        },
        assignmentCategory: {
          type: String,
          required: true,
          lowercase: true,
          enum: ["frontend", "backend"],
        },
        assignmentStatus: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// * EMPLOYEE MODEL
const EmployeeModel = model("EmployeeDetail", employeeSchema);

module.exports = EmployeeModel;
