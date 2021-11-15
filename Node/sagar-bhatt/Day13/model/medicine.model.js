const { Schema, model } = require("mongoose");

const medicineSchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 2,
      maxlength: 30,
      unique: true,
      alias: "medicineName",
      trim: true,
    },
  },
  { timestamps: true }
);

const MedicineModel = model("medicine", medicineSchema);

module.exports = MedicineModel;
