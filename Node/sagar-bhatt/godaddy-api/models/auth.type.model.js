const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const authTypeSchema = new Schema(
  {
    _id: Number,
    authType: {
      type: String,
      trim: true,
      lowercase: true,
      max: [20, `Auth type must be less than or equal to 20 characters.`],
      required: [true, `Auth type is required!`],
      unique: [true, `Auth type is already exists!`],
    },
    isActive: {
      type: Boolean,
      require: true,
      default: 1,
    },
  },
  { timestamps: true }
);

authTypeSchema.plugin(AutoIncrement, {
  id: "authType_seq",
});

const AuthTypeModel = model("authType", authTypeSchema);
module.exports = AuthTypeModel;
