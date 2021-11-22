const { Schema, model, connection } = require("mongoose");
const AutoIncrementFactory = require("mongoose-sequence");

const AutoIncrement = AutoIncrementFactory(connection);

const roleSchema = new Schema(
  {
    _id: Number,
    role: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

roleSchema.plugin(AutoIncrement, {
  id: "role_seq",
});

const RoleModel = model("role", roleSchema);

module.exports = RoleModel;
