const { Schema, model } = require("mongoose");

const departmentSchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 2,
      maxlength: 20,
      alias: "departmentName",
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const DepartmentModel = model("department", departmentSchema);

module.exports = DepartmentModel;
