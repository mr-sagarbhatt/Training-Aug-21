const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const roleSchema = new Schema(
  {
    _id: Number,
    role: {
      type: String,
      trim: true,
      lowercase: true,
      max: [20, `User role must be less than or equal to 20 characters.`],
      required: [true, `User role is required!`],
      unique: [true, `User role is already exists!`],
      // enum: ["admin", "user"],
    },
    isActive: {
      type: Boolean,
      require: true,
      default: 1,
    },
  },
  { timestamps: true }
);

roleSchema.plugin(AutoIncrement, {
  id: "role_seq",
});

const RolesModel = model("role", roleSchema);
module.exports = RolesModel;
