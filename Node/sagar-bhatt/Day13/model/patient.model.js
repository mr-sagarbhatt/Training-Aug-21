const { Schema, model } = require("mongoose");

const patientSchema = new Schema(
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
    department: {
      type: Number,
      ref: "department",
      required: true,
    },
    medicines: [
      {
        medicine: {
          type: Number,
          ref: "medicine",
        },
        doses: [
          {
            type: String,
            enum: ["morning", "afternoon", "night"],
          },
        ],
      },
    ],
    isDeleted: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: true }
);

const PatientModel = model("patient", patientSchema);

module.exports = PatientModel;
